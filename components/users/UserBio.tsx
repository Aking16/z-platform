import { useMemo } from "react";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { EditForm } from "../forms/EditForm";
import useFollow from "@/hooks/useFollow";
import { useTheme } from "next-themes";
import { ProfileImageForm } from "../forms/ProfileImageForm";
import { ScrollArea } from "../ui/scroll-area";

const UserBio = ({ userId }: { userId: string }) => {
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
    <div className="border-b pb-5">
      <div className="flex justify-end m-5">
        {currentUser?.id === userId ?
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={`${theme === "light" ? "default" : "outline"}`} size={"md"}>Set up Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
                  {theme === "light" ?
                    <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
                    :
                    <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
                  }
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[24rem] md:h-full">
                <EditForm userId={userId} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
          :
          <Button
            onClick={toggleFollow}
            variant={`${theme === "light" ? "default" : "outline"}`}
            size={"md"}
            className={isFollowing || `dark:bg-white dark:text-black dark:hover:bg-white/80`}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        }
      </div>
      <div className="ms-6">
        <p className="text-xl font-bold">
          {fetchedUser?.name}
        </p>
        <p className="text-sm text-muted font-bold">
          @{fetchedUser?.username}
        </p>
        <p className="mt-3">
          {fetchedUser?.bio}
        </p>
        <div className="flex items-center gap-x-2 text-muted mt-3">
          <CalendarDays className="w-4 h-4" />
          <p>Joined {createdAt}</p>
        </div>
        <div className="flex items-center gap-x-1 font-semibold text-sm mt-2">
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

export default UserBio;