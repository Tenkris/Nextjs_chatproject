import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  try {
    // Hash the password with automatically generated salt and specified salt rounds
    const hashedPassword = await bcrypt.hash(password, 10); // Number of salt rounds
    return hashedPassword;
  } catch (error) {
    // Handle any potential errors
    throw new Error('Error hashing password');
  }
}

function isValidPassword(password: string): boolean {
  // Regular expressions for checking password criteria
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinimumLength = password.length >= 8;

  // Check if the password meets all criteria
  return hasUpperCase && hasLowerCase && hasNumber && hasMinimumLength;
}

export { hashPassword, isValidPassword };
