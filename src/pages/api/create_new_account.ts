import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const createNewAccount = (req: NextApiRequest, res: NextApiResponse<BooleanResult>) => {
  res.status(200).json({ result: true });
}

export default createNewAccount;
