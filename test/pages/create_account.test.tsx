import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

// import and mock for next router
import router from "next/router";
jest.mock('next/router', () => require('next-router-mock'));

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('creating account with credentials that do not pass validation should render error messages to the screen', async () => {
    render(<CreateAccount />);

    // mocks the response we would receive from the create_account endpoint with empty inputs
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        'username_too_short': 'Your username must be at least 10 characters long.','username_too_long': 'Your username must be at most 50 characters long.',
        'password_too_short': 'Your password must be at least 20 characters long.',
        'password_too_long': 'Your password must be at most 50 characters long.',
        'password_no_letter': 'Your password must contain a letter.',
        'password_no_number': 'Your password must contain a number.',
        'password_no_symbol': 'Your password must contain a symbol (!,@,#,$,%).'
      }
    }));

    // imitates a user clicking the create account button with no inputs
    userEvent.click(screen.getByText('Create Account'));

    // after the click, tests that a fetch request was made once
    // to our api endpoint and corresponding options
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: JSON.stringify({
        username: '',
        password: ''
      }),
      method: 'POST',
    });

    // wait for our fetch request to resolve
    await waitFor(() => {
      // all error messages should be displayed
      screen.getByText('Your username must be at least 10 characters long.');
      screen.getByText('Your username must be at most 50 characters long.');
      screen.getByText('Your password must be at least 20 characters long.');
      screen.getByText('Your password must be at most 50 characters long.');
      screen.getByText('Your password must contain a letter.');
      screen.getByText('Your password must contain a number.');
      screen.getByText('Your password must contain a symbol (!,@,#,$,%).');
    });
  });

  test('creating account with credentials that pass validation and do not have an exposed password should route the user to the login page', async () => {
    render(<CreateAccount />);

    // first API request should return true (validated)
    fetchMock.mockResponseOnce(JSON.stringify({
      result: true
    }))
    // second API request should return false (password not exposed)
    .mockResponseOnce(JSON.stringify({
      result: false
    }));

    // credentials that pass validation
    userEvent.type(screen.getByLabelText('Username'), '10charslong');
    userEvent.type(screen.getByLabelText('Password'), '20charslongandcontainsnumsandsymbols!');
    userEvent.click(screen.getByText('Create Account'));

    // after the click, tests that a fetch request was made once
    // to our create_new_account endpoint with the correct options
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: JSON.stringify({
        username: '10charslong',
        password: '20charslongandcontainsnumsandsymbols!'
      }),
      method: 'POST',
    });

    // wait for our first fetch to resolve
    await waitFor(() => {});

    // after validation, tests that a fetch request was made once
    // to our password_exposed endpoint with the correct options
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: JSON.stringify({
        password: '20charslongandcontainsnumsandsymbols!'
      }),
      method: 'POST',
    });

    // wait for our second fetch to resolve
    await waitFor(() => {});

    // user should be routed to login page
    expect(router).toMatchObject({
      pathname: '/login'
    });

  });

  test('creating account with credentials that pass validation but have an exposed password should render the exposed password modal', async () => {
    render(<CreateAccount />);

    // first API request should return true (validated)
    fetchMock.mockResponseOnce(JSON.stringify({
      result: true
    }))
    // second API request should return true (password exposed)
    .mockResponseOnce(JSON.stringify({
      result: true
    }));

    userEvent.type(screen.getByLabelText('Username'), '10charslong');
    // this password is in the exposed passwords list
    userEvent.type(screen.getByLabelText('Password'), 'weakpassweakpassweakpass2021!');
    userEvent.click(screen.getByText('Create Account'));

    // after the click, tests that a fetch request was made once
    // to our create_new_account endpoint with the correct options
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: JSON.stringify({
        username: '10charslong',
        password: 'weakpassweakpassweakpass2021!'
      }),
      method: 'POST',
    });

    // wait for our first fetch to resolve
    await waitFor(() => {});

    // after validation, tests that a fetch request was made once
    // to our password_exposed endpoint with the correct options
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: JSON.stringify({
        password: 'weakpassweakpassweakpass2021!'
      }),
      method: 'POST',
    });

    // wait for our second fetch to resolve
    await waitFor(() => {
      // password exposed modal should show on the screen
      screen.getByText('Your password has been found in a data breach and is exposed. We recommend creating a new password.');
    });
  });

  test('in the exposed password modal, clicking "change password" should exit the modal', async () => {
    render(<CreateAccount />);

    // first API request should return true (validated)
    fetchMock.mockResponseOnce(JSON.stringify({
      result: true
    }))
    // second API request should return true (password exposed)
    .mockResponseOnce(JSON.stringify({
      result: true
    }));

    userEvent.type(screen.getByLabelText('Username'), '10charslong');
    // this password is in the exposed passwords list
    userEvent.type(screen.getByLabelText('Password'), 'weakpassweakpassweakpass2021!');
    userEvent.click(screen.getByText('Create Account'));

    // wait for our requests to resolve
    await waitFor(() => {});

    // clicking the change password button should remove the modal
    userEvent.click(screen.getByText('Change password (recommended)'));
    const modal = screen.queryByText('Your password has been found in a data breach and is exposed. We recommend creating a new password.');
    expect(modal).toBeNull();
  });

  test('in the exposed password modal, clicking "proceed" should route the user to the login page', async () => {
    render(<CreateAccount />);

    // first API request should return true (validated)
    fetchMock.mockResponseOnce(JSON.stringify({
      result: true
    }))
    // second API request should return true (password exposed)
    .mockResponseOnce(JSON.stringify({
      result: true
    }));

    userEvent.type(screen.getByLabelText('Username'), '10charslong');
    // this password is in the exposed passwords list
    userEvent.type(screen.getByLabelText('Password'), 'weakpassweakpassweakpass2021!');
    userEvent.click(screen.getByText('Create Account'));

    // wait for our requests to resolve
    await waitFor(() => {});

    // clicking the proceed button should route the user to the login page
    userEvent.click(screen.getByText('Proceed'));
    expect(router).toMatchObject({
      pathname: '/login'
    });
  });
});
