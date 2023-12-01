import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({userId, postId}: {userId?: string, postId: string}) => {
    const { data: currentUser } = useCurrentUser();
    const { data:fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        try {
            let request;
            
            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            mutateFetchedPosts();
            mutateFetchedPost();

            toast.success("Success!", { style: { color: "#fff", background: "#000" } });
        } catch (error) {
            toast.error("Something went wrong!", { style: { color: "#fff", background: "#000" } });
        }
    }, [hasLiked, mutateFetchedPosts, mutateFetchedPost, postId]);

    return {
        hasLiked,
        toggleLike
    }
}

export default useLike;
