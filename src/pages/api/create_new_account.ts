import type { NextApiRequest, NextApiResponse } from 'next';
import validate from './validation';

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const createNewAccount = (req: NextApiRequest, res: NextApiResponse<BooleanResult>) => {
  const accountInfo = JSON.parse(req.body);
  const response = validate(accountInfo);
  res.status(200).json(response);
}

export default createNewAccount;
