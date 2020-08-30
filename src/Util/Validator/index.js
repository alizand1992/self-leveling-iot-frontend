export const validateEmail = (email) => {
  email = email.trim();

  if (email.length === 0) {
    return ['Email cannot be empty.'];
  }

  return [];
};

export const validatePassword = (password, confirm_password = undefined) => {
  if (password.length === 0) {
    return ['Password cannot be empty.'];
  } else if (password.length < 6) {
    return ['Password needs to be at least 6 characters.'];
  }

  if (confirm_password && confirm_password !== password) {
    return ['Confirm password and password do not match.'];
  }

  return [];
};

export const fieldNotEmpty = (fields) => {
  const errors = [];

  Object.entries(fields).forEach(([key, value]) => {
    if (value.trim() === '') {
      const name =
        key.charAt(0).toUpperCase() +
        key
          .replace('_', ' ')
          .slice(1);

      errors.push(`${name} cannot be empty.`);
    }
  });

  return errors;
};