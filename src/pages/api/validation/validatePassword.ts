const validatePassword = (password: string): Record<string, string> => {
  const errors = {};
  if (password.length < 20) {
    errors['password_too_short'] = 'Your password must be at least 20 characters long';
  }
  if (password.length > 50) {
    errors['password_too_long'] = 'Your password must be at most 50 characters long';
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
    errors['password_no_letter'] = 'Must contain a letter';
  }
  if (!containsNumber) {
    errors['password_no_number'] = 'Must contain a number';
  }
  if (!containsSymbol) {
    errors['password_no_symbol'] = 'Must contain one of the following symbols: !,@,#,$,%';
  }

  return errors;
}

export default validatePassword;
