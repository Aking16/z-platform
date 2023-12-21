"use client"

import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Edit } from "lucide-react";
import { ProfileImageForm } from "@/components/forms/ProfileImageForm";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
    src?: string;
    editable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, src, editable }) => {
    const { theme } = useTheme();
    const router = useRouter();
    const { data: fetchedUser } = useUser(userId);
    const { data: currentUser } = useCurrentUser();

    function onClick() {
        if (!editable) {
            router.push(`/users/${userId}`);
        }
    }

    function imageSrc() {
        let source;

        if (src) {
            source = src;
        } else if (fetchedUser?.profileImage) {
            source = fetchedUser?.profileImage;
        } else {
            source = '/avatars/placeholder.png'
        }

        return source;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`group rounded-full hover:opacity-90 transition cursor-pointer relative
                ${hasBorder && 'border-4 border-secondary dark:border-black'} 
                ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-12'} `}>
                    <Image
                        fill
                        alt="Avatar"
                        src={imageSrc()}
                        onClick={onClick}
                        className="object-cover rounded-full" />

                    {editable && currentUser?.id === userId &&
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary/60 rounded-full p-2 invisible group-hover:visible">
                            <Edit size={24} className="text-primary-foreground" />
                        </div>
                    }
                </div>
            </DialogTrigger>
            {editable && currentUser?.id === userId &&
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
                        <ProfileImageForm userId={userId} />
                    </ScrollArea>
                </DialogContent>
            }
        </Dialog>
    );
}

export default Avatar;