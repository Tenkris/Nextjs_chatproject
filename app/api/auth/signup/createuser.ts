import { PrismaClient } from '@prisma/client';
import cuid from 'cuid';
import { hashPassword } from '@/app/utils/PasswordUtils';

const prisma = new PrismaClient();

async function createUser(
  email: string, // unique
  password: string,
  name: string, // unique
  dateOfBirth: Date,
): Promise<{ id: string; email: string; name: string; dateOfBirth: Date }> {
  try {
    // Generate a UUID for the new user
    const userId = cuid();
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email,
        password: hashedPassword,
        name,
        dateOfBirth,
      },
    });

    // Return the newly created user's details
    return {
      id: newUser.id,
      email: newUser.email as string,
      name: newUser.name as string,
      dateOfBirth: newUser.dateOfBirth as Date,
    };
  } catch (error: any) {
    // Handle the error and rethrow it
    throw new Error(error.message);
  }
}

export { createUser };
