import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useTheme } from "next-themes";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Avatar from "@/components/Avatar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";

export const UserSetting = () => {
    const { data: currentUser } = useCurrentUser();
    const { theme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="flex justify-center mt-auto mb-5 px-1 lg:justify-start" variant="secondary">
                    <Avatar hasBorder userId={currentUser?.id} />
                    <div className="hidden flex-col text-start xl:flex">
                        <span className="ms-2">{currentUser?.name}</span>
                        <span className="ms-2 text-muted">@{currentUser?.username}</span>
                    </div>
                    <MoreHorizontal size={20} className="text-muted ms-auto hidden xl:block" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[14rem] my-2 cursor-pointer">
                <DropdownMenuItem>
                    <ThemeSwitcher />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="focus:bg-destructive/30 focus:text-primary-foreground"
                    onClick={() => signOut()}>
                    {theme === "light" ?
                        <Image priority src={"/z-light.svg"} alt="Z logo" width={20} height={20} />
                        :
                        <Image priority src={"/z-dark.svg"} alt="Z logo" width={20} height={20} />
                    }
                    <span className="ms-4"> Sign Out </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
