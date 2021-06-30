import { createMocks, RequestOptions } from 'node-mocks-http';

/**
 * You won't need to change anything in this file.
*/

// returns an object with mock req and res properties
export function mockRequest(options: RequestOptions) {
  if (options.method === 'POST') {
    return createMocks({
      ...options,
      body: (JSON.stringify(options.body) as unknown) as Body,
    });
  }

  return createMocks(options);
}
