import type { NextApiRequest, NextApiResponse } from 'next';
import passwords from './exposed-passwords';

interface PasswordExposedParameters {
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

/**
 * You won't need to change anything in this file.
 * Use it as a reference for how to develop the "/api/create_new_account" endpoint.
*/

// this is the req/res handler function that will handle requests to the /api/password_exposed endpoint
const passwordExposed = (req: NextApiRequest, res: NextApiResponse<BooleanResult>) => {
  const { password }: PasswordExposedParameters = JSON.parse(req.body);
  console.log(passwords);
  if (passwords[password] !== undefined) {
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
}

export default passwordExposed;
