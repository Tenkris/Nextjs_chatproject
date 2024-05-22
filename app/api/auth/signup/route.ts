import { parseDateOfBirth } from '@/app/utils/dateUtils';
import { createUser } from './createuser';
import { isValidEmail } from '@/app/utils/emailUtils';
import { isValidPassword } from '@/app/utils/PasswordUtils';

interface ReqData {
  email: string;
  password: string;
  name: string;
  dateofbirth: string; // format '1990-05-21' -> year-month-day (YYYY-MM-DD)
}

export async function POST(request: Request) {
  try {
    const { email, password, name, dateofbirth }: ReqData =
      await request.json();

    // Check if required fields are present
    const requiredFields = ['email', 'password', 'name', 'dateofbirth'];
    if (requiredFields.some((field) => !eval(field))) {
      throw new Error('Missing required fields');
    }

    // Check if Date of Birth is valid
    const parsedDate = parseDateOfBirth(dateofbirth);
    if (!(parsedDate instanceof Date)) {
      // Check if parsedDate is of type Date
      throw new Error(parsedDate.message);
    }

    // Check if email is valid
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    // Check if password is valid
    if (!isValidPassword(password)) {
      throw new Error('Invalid password');
    }

    // Create the user
    const newUser = await createUser(email, password, name, parsedDate);

    return Response.json(
      {
        message: 'User created successfully',
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
