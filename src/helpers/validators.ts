const usernameValidator = (name: string) => {
  if (!name) return "username can't be empty.";
  return '';
};

const passwordValidator = (password: string) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 5) return 'Password must be at least 5 characters long.';
  return '';
};

const confirmPasswordValidator = (password: string, cpassword: string) => {
  if (password !== cpassword) return 'Confirm password does not match.';
  return '';
};
export function emailValidator(email: string) {
  if (!email) return "Email can't be empty.";
  else if (!verifyEmailFormat(email)) return 'Ooops! We need a valid email address.';

  return '';
}

export function verifyEmailFormat(email: string) {
  const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  console.log(reg.test(email), email);
  return reg.test(email);
}

export { usernameValidator, passwordValidator, confirmPasswordValidator };
