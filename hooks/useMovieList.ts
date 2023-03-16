import useSWR from 'swr';

import fetcher from '../lib/fetcher';

const useMovieList = () => {
  // Make a get request to the api/movies to get all the movies
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    // Just reload when load the page not every time lose focus or something
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data,
    error,
    isLoading
  };
};

export default useMovieList;
