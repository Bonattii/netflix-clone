import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

import useCurrentUser from '../hooks/useCurrentUser';
import useFavorites from '../hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    // Get the user favorite list
    const list = currentUser?.favoriteIds || [];

    // Return if the list includes the movie or not
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    // If the movie already exists on the list will delete it
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    // Get the updated favorite lists create above
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Call mutate to update the current user list on the db
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds
    });

    // Call the mutate favorites
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // If the movie is alrady favorited will get the check icon
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        items-center
        justify-center
        transition
        hover:border-neutral-300
      "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
