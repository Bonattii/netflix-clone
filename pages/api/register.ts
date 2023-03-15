import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Just allow post request to this route
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    // Verify if already exists an user with this email on the db
    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    });

    // If already exists return a status 422
    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    // Create a hashedPassword using bcrypt for the password provided
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create an user on the db with the informations provided
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      }
    });

    // Return an status 200 and a json of the user info
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
