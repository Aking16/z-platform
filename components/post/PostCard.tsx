"use client";

import useLike from '@/hooks/useLike';
import { formatDistanceToNowStrict } from 'date-fns';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import Avatar from '../Avatar';
import { Separator } from '../ui/separator';

interface PostCardProps {
    data: Record<string, any>;
    userId?: string;
}

const PostCard: React.FC<PostCardProps> = ({ data = {}, userId }) => {
    const router = useRouter();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback(async (ev: any) => {
        ev.stopPropagation();

        toggleLike();
    }, [toggleLike]);

    const CreatedAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <div className="flex px-4 py-3 border-b cursor-pointer hover:bg-white/5" onClick={goToPost}>
            <div>
                <Avatar userId={data.user.id} />
            </div>
            <div className="flex flex-1 flex-col ms-5">
                <div className="flex items-center">
                    <div className="flex flex-col md:flex-row gap-x-3">
                        <p className="font-bold">{data.user.name}</p>
                        <p className="text-muted">@{data.user.username}</p>
                    </div>
                    <p className="ms-auto text-muted">{CreatedAt}</p>
                </div>
                <p className="mt-2">{data.body}</p>
                <div className="flex mt-2 gap-x-10 items-center">
                    <div className="flex gap-x-1 items-center group">
                        <button
                            className="text-muted rounded-full p-1 group-hover:text-secondary group-hover:bg-secondary/30">
                            <MessageCircle size={20} />
                        </button>
                        <span className="text-muted group-hover:text-secondary">
                            {data.comments?.length || 0}
                        </span>
                        <button />
                    </div>
                    <div className="flex gap-x-1 items-center group">
                        <button
                            onClick={onLike}
                            className="text-muted rounded-full p-1 group-hover:text-pink-600 group-hover:bg-pink-600/30">
                            <Heart size={20} className={hasLiked ? `text-pink-600 fill-pink-600` : `fill-none`} />
                        </button>
                        <span className="text-muted group-hover:text-pink-600">
                            {data.likedIds.length}
                        </span>
                        <button />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PostCard;
