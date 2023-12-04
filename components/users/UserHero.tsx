import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

const UserHero = ({ userId }: { userId: string }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-[#333639] h-[12.5rem] relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}

export default UserHero;