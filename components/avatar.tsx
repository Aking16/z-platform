"use client"

import Image from "next/image";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
    const router = useRouter();
    const { data: fetchedUser } = useUser(userId);

    function onClick() {
        const url = `/users/${userId}`;

        router.push(url);
    }

    return (
        <div className={`${hasBorder ? 'border-4 border-secondary dark:border-black' : ''} ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-12'} rounded-full hover:opacity-90 transition cursor-pointer relative`}>
            <Image
                fill
                alt="Avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || '/avatars/placeholder.png'}
                className="object-cover rounded-full"
            />
        </div>
    );
}

export default Avatar;