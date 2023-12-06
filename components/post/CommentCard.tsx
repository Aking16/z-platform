"use client";

import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import Avatar from '@/components/Avatar';
import { Separator } from '@/components/ui/separator';

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
                    <div className="flex items-center">
                        <div className="flex flex-col md:flex-row gap-x-3">
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-muted">@{data.user.username}</p>
                        </div>
                        <p className="ms-auto text-muted">{CreatedAt}</p>
                    </div>
                    <p className="mt-2">{data.body}</p>
                </div>
            </div>

            <Separator />
        </>
    )
}

export default CommentCard;
