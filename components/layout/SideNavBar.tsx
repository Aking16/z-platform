import Avatar from "@/components/Avatar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { PostForm } from "@/components/forms/PostForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Dot, Feather, MoreHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface SideNavBarProps {
    routes: {
        label: string;
        href: string;
        icon: ReactNode;
        alert?: boolean;
    }[]
}

const SideNavBar: React.FC<SideNavBarProps> = ({ routes }) => {
    const { data: currentUser } = useCurrentUser();
    const { theme } = useTheme()

    return (
        <aside className="flex flex-col h-screen sticky top-0 gap-y-5 pe-4 xl:pe-8">
            {theme === "light" ?
                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
                :
                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
            }

            {routes.map((route) => (
                <Link href={route.href} key={route.label}>
                    <Button key={route.label} size="custom" variant="secondary" className="text-2xl font-bold w-fit relative">
                        {route.alert && <Dot size={70} className="absolute -top-5 -left-4 text-secondary" />}
                        {route.icon}
                        <span className="me-auto hidden xl:block">{route.label}</span>
                    </Button>
                </Link>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="text-2xl font-bold xl:px-24">
                        <span className="hidden xl:block">Post</span>
                        <Feather className="xl:hidden" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
                            {theme === "dark" ?
                                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} />
                                :
                                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} />
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <PostForm placeHolder={"What's happening?!"} />
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex justify-center mt-auto mb-5 p-0 lg:justify-start" variant="secondary">
                        <Avatar hasBorder userId={currentUser?.id} />
                        <div className="hidden flex-col text-start xl:flex sr">
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
                    <DropdownMenuSeparator className="bg-border"/>
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
        </aside >
    )
}

export default SideNavBar;