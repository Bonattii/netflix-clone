import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // POST request
    if (req.method === 'POST') {
      // Authenticate to see if the user is logged in
      const { currentUser } = await serverAuth(req);

      // Get the movie id from the req
      const { movieId } = req.body;

      // Search for a movie on the db with the same id
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      // If the movie doesn't exist on the db
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      // Update the favorites list of the user
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },

        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });

      return res.status(200).json(user);
    }

    // DELETE request
    if (req.method === 'DELETE') {
      // Authenticate to see if the user is logged in
      const { currentUser } = await serverAuth(req);

      // Get the movie id from the req
      const { movieId } = req.body;

      // Search for a movie on the db with the same id
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      // If the movie doesn't exist on the db
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      // Create an array excluding the movieId from it
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      // Update the favoriteIds array on the db
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },

        data: {
          favoriteIds: updatedFavoriteIds
        }
      });

      // Return the updated user
      return res.status(200).json(updatedUser);
    }

    // If the request is not post or delete
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
