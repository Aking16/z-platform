"use client"

import { PostForm } from '@/components/forms/PostForm';
import Header from '@/components/layout/Header';
import CommentFeed from '@/components/post/CommentFeed';
import PostCard from '@/components/post/PostCard';
import { Separator } from '@/components/ui/separator';
import usePost from '@/hooks/usePost';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const PostIdPage = () => {
    const params = useParams();
    const postId = params.postId.toString();
    const { data: fetchedPost, isLoading } = usePost(postId);

    if (isLoading || !fetchedPost) {
        return (
            <section className="flex justify-center items-center h-[24.5rem]">
                <Loader2 className="animate-spin me-2 text-secondary" />
                loading
            </section>
        )
    }

    return (
        <section>
            <Header title="Post" backArrow />
            <PostCard data={fetchedPost} />
            <PostForm placeHolder="Tweet your reply!" isComment postId={postId} />
            <Separator className='mt-5' />
            <CommentFeed comments={fetchedPost?.comments} />
        </section>
    )
}

export default PostIdPage;