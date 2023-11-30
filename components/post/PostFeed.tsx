import usePosts from '@/hooks/usePosts';
import PostCard from './PostCard';

interface PostFeedProps {
    userId?: string;
  }

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId) ;

    return (
        <>
            {posts.map((post: Record<string, any>,) => (
                <PostCard key={post.id} data={post} />
            ))}
        </>
    );
};

export default PostFeed;
