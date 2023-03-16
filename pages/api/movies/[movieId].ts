import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If the reques is not a GET request
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Wait to see if the user is logged in
    await serverAuth(req);

    // When you define a route with [] it puts the name on the req.query
    const { movieId } = req.query;

    // If the id is not a string
    if (typeof movieId !== 'string') {
      throw new Error('Invalid ID');
    }

    // If the id doesn't exists on the req
    if (!movieId) {
      throw new Error('Invalid ID');
    }

    // Search for a movie on the dv with the same id of the req
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    // If the movie doesn't exists on the db
    if (!movie) {
      throw new Error('Invalid ID');
    }

    // Return the movie
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
