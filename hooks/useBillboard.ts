import useSWR from 'swr';

import fetcher from '../lib/fetcher';

const useBillboard = () => {
  // Call the api on api/random using useSWR
  const { data, error, isLoading } = useSWR('/api/random', fetcher, {
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

export default useBillboard;
