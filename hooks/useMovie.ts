import useSWR from 'swr';

import fetcher from '../lib/fetcher';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    // Just make sure to just fetch if we have the id
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      // Just reload when load the page not every time lose focus or something
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    data,
    error,
    isLoading
  };
};

export default useMovie;
