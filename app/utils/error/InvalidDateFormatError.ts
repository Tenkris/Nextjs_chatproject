class InvalidDateFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDateFormatError';
  }
}

export { InvalidDateFormatError };
