const validateEmail = (email: string): Record<string, string> => {
  const errors = {};
  // some brief code validating emails
  const comps = email.split(/[@.]/);
  if (comps.length !== 3) {
    errors['invalid_email'] = 'Please enter a valid email address.';
  }
  return errors;
};

export default validateEmail;
