import { InvalidDateFormatError } from './error/InvalidDateFormatError';

function parseDateOfBirth(
  dateOfBirthString: string,
): Date | InvalidDateFormatError {
  // Regular expression to match 'YYYY-MM-DD' format
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the dateOfBirthString matches the expected format
  if (!dateFormatRegex.test(dateOfBirthString)) {
    // If the format doesn't match, throw an InvalidDateFormatError
    throw new InvalidDateFormatError(
      'Invalid date format. Expected format: YYYY-MM-DD',
    );
  }

  // Parse the dateOfBirthString into a Date object
  const [year, month, day] = dateOfBirthString.split('-').map(Number);
  const dateOfBirth = new Date(year, month - 1, day); // Note: month - 1 because months are zero-based in JavaScript

  // Check if the parsed date is a valid date
  if (isNaN(dateOfBirth.getTime())) {
    // If the parsed date is invalid, throw an InvalidDateFormatError
    throw new InvalidDateFormatError('Invalid date');
  }

  // Return the parsed Date object
  return dateOfBirth;
}

function formatDate(day: string, month: string, year: string): string {
  // Ensure leading zeros for day and month
  const formattedDay = day.padStart(2, '0');
  const formattedMonth = month.padStart(2, '0');

  // Return formatted date
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export { parseDateOfBirth, formatDate };
