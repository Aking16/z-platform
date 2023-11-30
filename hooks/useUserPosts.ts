import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useUserPosts = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/posts/${userId}`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUserPosts;
