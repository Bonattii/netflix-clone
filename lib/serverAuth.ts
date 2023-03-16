import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prismadb from './prismadb';

const serverAuth = async (req: NextApiRequest) => {
  // Take the jwt token on the req and verify the session
  const session = await getSession({ req });

  // If the sesion doesn't hold an user
  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  // Find a session user on the db
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  // If didn't find an user on the db
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  // Return the user information
  return { currentUser };
};

export default serverAuth;
