import CommentCard from '@/components/post/CommentCard';

interface CommentFeedProps {
    comments?: Record<string, any>[];
  }

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment) => (
                <CommentCard key={comment.id} data={comment}/>
            ))}
        </>
    );
};

export default CommentFeed;
