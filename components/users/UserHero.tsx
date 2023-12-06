import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

const UserHero = ({ userId }: { userId: string }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-gradient-to-t from-sky-500 to-sky-300 h-[12.5rem] relative dark:from-neutral-700 dark:to-neutral-500">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'contain' }} />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}

export default UserHero;