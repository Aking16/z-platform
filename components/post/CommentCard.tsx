"use client";

import React, { useCallback, useMemo } from 'react'
import Avatar from '../avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Separator } from '../ui/separator';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Reply } from 'lucide-react';
import useLike from '@/hooks/useLike';

interface CommentCardProps {
    data: Record<string, any>;
}

const CommentCard: React.FC<CommentCardProps> = ({ data = {} }) => {
    const router = useRouter();

    const goToUser = useCallback(() => {
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const CreatedAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <>
            <div className="flex px-4 py-3 hover:bg-white/5" onClick={goToUser}>
                <Avatar userId={data.user.id} />
                <div className="flex flex-1 flex-col ms-5">
                    <div className="flex items-center gap-x-3">
                        <p className="font-bold">{data.user.name}</p>
                        <p className="text-muted">@{data.user.username}</p>
                        <p className="text-muted">{CreatedAt}</p>
                    </div>
                    <p>{data.body}</p>
                </div>
            </div>

            <Separator />
        </>
    )
}

export default CommentCard;
