import validateUsername from './validateUsername';
import validatePassword from './validatePassword';

interface AccountInfo {
  username: string,
  password: string
}

// endpoint will return an informative object to the UI;
// if either username or password does not meet criteria,
// the specific error(s) will be displayed
interface Errors {
  errors: Array<string>
}

interface Response {
  username: boolean | Errors;
  password: boolean | Errors;
}

const validate = (info: AccountInfo): Response => {
  return {
    username: validateUsername(info.username),
    password: validatePassword(info.password)
  };
};

export default validate;
