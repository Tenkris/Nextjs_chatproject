import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '@/app/utils/PasswordUtils';
const prisma = new PrismaClient();

async function createUser(
  email: string, // unique
  password: string,
  username: string, // unique
  dateOfBirth: Date,
) {
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

  } catch (error: any) {
    // throw error
    throw new Error(error.message);
  }
}

export { createUser };
