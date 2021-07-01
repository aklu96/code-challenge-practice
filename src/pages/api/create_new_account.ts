import type { NextApiRequest, NextApiResponse } from 'next';
import validate from './validation';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const createNewAccount = (req: NextApiRequest, res: NextApiResponse<BooleanResult>) => {
  const accountInfo = JSON.parse(req.body);
  console.log(validate(accountInfo));
  res.status(200).json({ result: true });
}

export default createNewAccount;
