import { ReactNode } from "react";
import Link from "next/link";

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
import { UserSetting } from "@/components//users/UserSetting";
import Logo from "@/components/layout/Logo";

interface SideNavBarProps {
    routes: {
        label: string;
        href: string;
        icon: ReactNode;
        alert?: boolean;
    }[]
}

const SideNavBar: React.FC<SideNavBarProps> = ({ routes }) => {
    return (
        <nav className="hidden flex-col h-screen sticky top-0 gap-y-5 pe-4 xl:pe-8 md:flex">
            <Link href={"/home"}>
                <Button size="custom" variant="secondary" className="mt-2 w-fit px-2">
                    <Logo size={40} />
                </Button>
            </Link>

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
                            <Logo size={40} />
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