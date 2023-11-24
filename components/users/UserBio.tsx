import { useMemo } from "react";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import { useSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const UserBio = ({ userId }: { userId: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const createdAt = useMemo(() => {    
    if (!fetchedUser?.createdAt) {
      return null;
    }

    console.log(currentUser?.id === userId)
    console.log(currentUser)
    console.log(userId)

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])


  return (
    <div className="border-b-2 pb-5">
      <div className="flex justify-end m-5">
        {currentUser?.id === userId ?
          <Button variant="outline" size={"md"}>Set up Profile</Button>
          :
          <Button variant="outline" size={"md"}>Follow</Button>
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