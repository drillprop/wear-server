import bcrypt from 'bcrypt';

export default async (givenPassword: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(givenPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error(error);
  }
};
