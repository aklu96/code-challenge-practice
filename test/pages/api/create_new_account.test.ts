import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/mocks/utils';

describe('/api/create_new_account', () => {
  test('returns true for username and password that pass validation', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'20charslongandcontainsnumsandsymbols!'
      },
    });

    // pass our mock request and response objects through this function
    // which is our validation endpoint function,
    // and then test the response
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns false and specific error for a short username', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'tooshort',
        password:'20charslongandcontainsnumsandsymbols!'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.username_too_short).toBeDefined();
  });

  test('returns false and specific error for a long username', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
        password:'20charslongandcontainsnumsandsymbols!'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.username_too_long).toBeDefined();
  });

  test('returns false and specific error for a short password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'tooshort'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.password_too_short).toBeDefined();
  });

  test('returns false and specific error for a long password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.password_too_long).toBeDefined();
  });

  test('returns false and specific error for a password without a letter', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'23492879743$*($&)*(&#%#&%)&#%)'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.password_no_letter).toBeDefined();
  });

  test('returns false and specific error for a password without a number', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'asdfsdaf*&&^*&^*&'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.password_no_number).toBeDefined();
  });

  test('returns false and specific error for a password without a symbol', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '10charslong',
        password:'7a8sd6g786sdfag6f7ads8g687'
      },
    });

    await createNewAccount(req, res);

    const resBody = res._getJSONData();

    expect(res._getStatusCode()).toBe(403);
    expect(resBody.result).toEqual(false);
    expect(resBody.errors.password_no_symbol).toBeDefined();
  });
});
