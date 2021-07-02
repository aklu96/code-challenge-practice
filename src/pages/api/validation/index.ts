import validateUsername from './validateUsername';
import validatePassword from './validatePassword';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

// endpoint will return an informative object to the UI;
// if either username or password does not meet criteria,
// the specific error(s) will be displayed
// error object values are specific messages to be displayed on the UI
interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

const validate = (info: CreateNewAccountParameters): BooleanResult => {
  let result = true;
  let errors: Record<string, string>;

  const usernameRes = validateUsername(info.username);
  const passwordRes = validatePassword(info.password);

  if (Object.keys(usernameRes).length > 0 || Object.keys(passwordRes).length > 0) {
    result = false;
    errors = Object.assign(usernameRes, passwordRes);
  }

  return result ? {
    result
  } : {
    result,
    errors
  }
};

export default validate;
