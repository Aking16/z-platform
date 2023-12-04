import Image from 'next/image';
import useNotifications from '@/hooks/useNotifications';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const NotificationFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[24.5rem]">
                <Loader2 className="animate-spin me-2 text-secondary" />
                loading
            </div>
        )
    }

    if (fetchedNotifications.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No notifications
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-border">
                    <Image priority src={"/z.svg"} alt="Z logo" width={35} height={35} />
                    <p>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default NotificationFeed;
