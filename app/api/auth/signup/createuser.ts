import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '@/app/utils/PasswordUtils';

const prisma = new PrismaClient();

async function createUser(
  email: string, // unique
  password: string,
  username: string, // unique
  dateOfBirth: Date,
): Promise<{ id: string; email: string; username: string; dateOfBirth: Date }> {
  try {
    // Generate a UUID for the new user
    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.userProfiles.create({
      data: {
        id: userId,
        email,
        password: hashedPassword,
        username,
        dateOfBirth,
      },
    });

    // Return the newly created user's details
    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      dateOfBirth: newUser.dateOfBirth,
    };
  } catch (error: any) {
    // Handle the error and rethrow it
    throw new Error(error.message);
  }
}

export { createUser };
