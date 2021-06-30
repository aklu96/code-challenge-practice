import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('rendering', () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // imitates a user clicking the create account button
    userEvent.click(screen.getByText('Create Account'));

    // after the click, tests that a fetch request was made once
    // to our api endpoint and corresponding options
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: '{}',
      method: 'POST',
    });
  });
});
