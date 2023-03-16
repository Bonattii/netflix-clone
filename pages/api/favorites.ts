import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If the request isn't a get request
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Authenticate the user to verify if it is logged in
    const { currentUser } = await serverAuth(req);

    // Will get the user favorite list from the db
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          // Kind of a foor loop to get all the movies Id on the list
          in: currentUser?.favoriteIds
        }
      }
    });

    // Return the list of favorites movies
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
