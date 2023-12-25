"use client"

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Edit } from "lucide-react";
import { CoverImageForm } from "@/components/forms/CoverImageForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/layout/Logo";

interface HeroProps {
    userId: string;
    src?: string;
    editable?: boolean;
}

const Hero: React.FC<HeroProps> = ({ userId, src, editable }) => {
    const { data: fetchedUser } = useUser(userId);
    const { data: currentUser } = useCurrentUser();

    function imageSrc() {
        let source;

        if (src) {
            source = src;
        } else if (fetchedUser?.coverImage) {
            source = fetchedUser?.coverImage;
        } else {
            source = '/placeholder/cover-placeholder.png'
        }
        return source;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`${editable && "cursor-pointer"} w-full h-full group relative`}>
                    <Image
                        fill
                        alt="Cover Image"
                        src={imageSrc()}
                        style={{ objectFit: 'contain' }} />

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
                            <Logo size={40} />
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[24rem] md:h-full">
                        <CoverImageForm userId={userId} />
                    </ScrollArea>
                </DialogContent>
            }
        </Dialog>
    );
}

export default Hero;