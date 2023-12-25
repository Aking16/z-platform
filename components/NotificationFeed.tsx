import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import Logo from '@/components/layout/Logo';

const NotificationFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [], mutate: mutateNotification, isLoading } = useNotifications(currentUser?.id);
    const { theme } = useTheme();

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

    async function HandleDelete(notifId: string) {
        await axios.delete(`/api/notification/${currentUser.id}?notifId=${notifId}`);
        mutateNotification();
    }

    return (
        <div className="flex flex-col">
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-border">
                    <Logo size={35} />
                    <p> {notification.body} </p>
                    <Button
                        variant="link"
                        size="sm"
                        className="ms-auto hover:text-white hover:bg-destructive hover:border-destructive"
                        onClick={() => HandleDelete(notification.id)}>
                        <X size={16} />
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default NotificationFeed;
