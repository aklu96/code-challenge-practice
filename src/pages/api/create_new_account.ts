import type { NextApiRequest, NextApiResponse } from 'next';
import validate from './validation';

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const createNewAccount = (req: NextApiRequest, res: NextApiResponse<BooleanResult>) => {
  const accountInfo = JSON.parse(req.body);
  const response = validate(accountInfo);
  if (response.result) {
    res.status(201).json(response);
  } else {
    res.status(403).json(response);
  }

}

export default createNewAccount;
