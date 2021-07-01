interface Errors {
  errors: Array<string>
}

const validateUsername = (username: string): boolean | Errors => {
  const errors = [];
  if (username.length < 10) {
    errors.push('Your username must be at least 10 characters long');
  }
  if (username.length > 50) {
    errors.push('Your username must be at most 50 characters long');
  }
  if (errors.length > 0) {
    return {
      errors
    };
  }
  return true;
}

export default validateUsername;
