const validateEmail = (email: string): Record<string, string> => {
  const errors = {};
  // some brief code validating emails
  let comps = email.split('@');
  comps = comps[comps.length - 1].split('.');
  if (comps.length !== 3) {
    errors['invalid_email'] = 'Please enter a valid email address.';
  }
  return errors;
};

export default validateEmail;
