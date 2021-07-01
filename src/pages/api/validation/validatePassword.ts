interface Errors {
  errors: Array<string>
}

const validatePassword = (password: string): boolean | Errors => {
  const errors = [];
  if (password.length < 20) {
    errors.push('Your password must be at least 20 characters long');
  }
  if (password.length > 50) {
    errors.push('Your password must be at most 50 characters long');
  }


  let containsLetter = false;
  let containsNumber = false;
  let containsSymbol = false;
  for (let i = 0; i < password.length; i++) {
    if (RegExp(/[a-z]|[A-Z]/).test(password[i])) {
      containsLetter = true;
    }

    if (RegExp(/[0-9]/).test(password[i])) {
      containsNumber = true;
    }

    if (RegExp(/[!@#$%]/).test(password[i])) {
      containsSymbol = true;
    }
  }

  if (!containsLetter) {
    errors.push('Must contain a letter');
  }
  if (!containsNumber) {
    errors.push('Must contain a number');
  }
  if (!containsSymbol) {
    errors.push('Must contain one of the following symbols: !,@,#,$,%');
  }

  if (errors.length > 0) {
    return {
      errors
    };
  }
  return true;
}

export default validatePassword;
