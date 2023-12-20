import { format } from "date-fns";
import { useMemo } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollow from "@/hooks/useFollow";
import useUser from "@/hooks/useUser";
import { CalendarDays } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { EditForm } from "@/components/forms/EditForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Avatar from "../Avatar";

const MenuUserBio = ({ userId }: { userId: string }) => {
    const { theme } = useTheme();
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userId);
    const { isFollowing, toggleFollow } = useFollow(userId);

    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }

        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
    }, [fetchedUser?.createdAt])


    return (
        <div>
            <Avatar userId={userId} />
            <div className="text-start">
                <p className="text-lg font-bold">
                    {fetchedUser?.name}
                </p>
                <p className="text-sm text-muted font-bold">
                    @{fetchedUser?.username}
                </p>
                <div className="flex items-center gap-x-1 font-semibold text-sm mt-4">
                    {fetchedUser?.followingIds.length}
                    <p className="text-muted me-5">
                        Following
                    </p>
                    {fetchedUser?.followersCount || 0}
                    <p className="text-muted">
                        Followers
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MenuUserBio;