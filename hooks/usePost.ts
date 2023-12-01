import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/posts/${postId}`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;
