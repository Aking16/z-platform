import { PostForm } from "@/components/forms/PostForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Dot, Feather } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { UserSetting } from "../users/UserSetting";

interface SideNavBarProps {
    routes: {
        label: string;
        href: string;
        icon: ReactNode;
        alert?: boolean;
    }[]
}

const SideNavBar: React.FC<SideNavBarProps> = ({ routes }) => {
    const { theme } = useTheme()

    return (
        <nav className="hidden flex-col h-screen sticky top-0 gap-y-5 pe-4 xl:pe-8 md:flex">
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

            <UserSetting />
        </nav >
    )
}

export default SideNavBar;