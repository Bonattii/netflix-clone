import useSWR from 'swr';

import fetcher from '../lib/fetcher';

const useFavorites = () => {
  // GET to /api/favorites to get the user favorites list
  const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
    // Just reload when load the page not every time lose focus or something
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false
  });

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useFavorites;
