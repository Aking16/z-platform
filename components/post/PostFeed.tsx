import usePosts from '@/hooks/usePosts';
import PostCard from '@/components/post/PostCard';
import { Loader2 } from 'lucide-react';

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [], isLoading } = usePosts(userId);

    if (isLoading || !posts) {
        return (
            <div className="flex justify-center items-center h-[24.5rem]">
                <Loader2 className="animate-spin me-2 text-secondary" />
                loading
            </div>
        )
    }

    return (
        <>
            {posts.map((post: Record<string, any>,) => (
                <PostCard key={post.id} data={post} />
            ))}
        </>
    );
};

export default PostFeed;
