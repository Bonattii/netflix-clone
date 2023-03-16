import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Authenticate the route to see if the user is logged in
    await serverAuth(req);

    // Get all the movies from the db
    const movies = await prismadb.movie.findMany();

    // Return a json with all the movies
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
