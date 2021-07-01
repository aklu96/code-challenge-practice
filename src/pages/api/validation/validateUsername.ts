const validateUsername = (username: string): Record<string, string> => {
  const errors = {};
  if (username.length < 10) {
    errors['username_too_short'] = 'Your username must be at least 10 characters long';
  }
  if (username.length > 50) {
    errors['username_too_long'] = 'Your username must be at most 50 characters long';
  }
  return errors;
}

export default validateUsername;
