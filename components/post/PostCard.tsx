"use client";

import React, { useCallback, useMemo } from 'react'
import Avatar from '../avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Separator } from '../ui/separator';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Reply } from 'lucide-react';

interface PostCardProps {
    data: Record<string, any>;
    userId?: string;
}

const PostCard: React.FC<PostCardProps> = ({ data = {}, userId }) => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    // const onLike = useCallback(async (ev: any) => {
    //     ev.stopPropagation();

    // }, [currentUser]);

    const CreatedAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <>
            <div className="flex px-4 py-3 hover:bg-white/5" onClick={goToPost}>
                <Avatar userId={data.user.id} />
                <div className="flex flex-1 flex-col ms-5">
                    <div className="flex items-center gap-x-3">
                        <p className="font-bold">{data.user.name}</p>
                        <p className="text-muted">@{data.user.username}</p>
                        <p className="text-muted">{CreatedAt}</p>
                    </div>
                    <p>{data.body}</p>
                    <div className="flex mt-2 gap-x-10 items-center">
                        <div className="flex gap-x-1 items-center group">
                            <button
                                className="text-muted rounded-full p-1 group-hover:text-secondary group-hover:bg-secondary/30">
                                <MessageCircle size={20} />
                            </button>
                            <span className="text-muted group-hover:text-secondary">
                                0
                            </span>
                            <button />
                        </div>
                        <div className="flex gap-x-1 items-center group">
                            <button
                                className="text-muted rounded-full p-1 group-hover:text-pink-600 group-hover:bg-pink-600/30">
                                <Heart size={20} />
                            </button>
                            <span className="text-muted group-hover:text-pink-600">
                                0
                            </span>
                            <button />
                        </div>
                    </div>
                </div>
            </div >

            <Separator />
        </>
    )
}

export default PostCard;
