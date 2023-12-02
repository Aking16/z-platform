import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useNotifications = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/notification/${userId}`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;
