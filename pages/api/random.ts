import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Confirm that the user is logged
    await serverAuth(req);

    // How many movies we have at the db
    const movieCount = await prismadb.movie.count();

    // Pick a random movie index 0 -> movieCount
    const randomIndex = Math.floor(Math.random() * movieCount);

    // Pick the movie on the db
    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    // Return the picked movie
    return res.status(200).json(randomMovie[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
