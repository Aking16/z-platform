import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import { ReactNode, useState } from "react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet";
import MenuUserBio from "@/components/users/MenuUserBio";
import { Dot, LogOut, Menu, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

interface HamBurgerMenuProps {
    routes: {
        label: string;
        href: string;
        icon: ReactNode;
        alert?: boolean;
    }[]
}

const HamBurgerMenu: React.FC<HamBurgerMenuProps> = ({ routes }) => {
    const { data: currentUser } = useCurrentUser();
    const [ open, setOpen ] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex fixed top-1 right-2 z-50 md:hidden" asChild>
                <Button variant="secondary" >
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
        <SheetContent side="left" className="bg-primary px-0">
                <SheetHeader className="px-4">
                    <MenuUserBio userId={currentUser?.id} />
                </SheetHeader>
                <div className="flex flex-col mt-4">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.label} onClick={() => setOpen(false)}>
                            <button className="flex w-full px-4 py-4 text-xl font-bold relative hover:bg-primary-foreground/10">
                                {route.alert && <Dot size={70} className="absolute -top-5 -left-4 text-secondary" />}
                                {route.icon}
                                <span className="ms-4">{route.label}</span>
                            </button>
                        </Link>
                    ))}
                </div>

                <button className="flex w-full px-4 py-4 text-xl font-bold relative hover:bg-primary-foreground/10"
                    onClick={() => signOut()}>
                    <LogOut size={28} />
                    <span className="ms-4">Logout</span>
                </button>

                <Accordion type="single" collapsible className="text-xl font-bold">
                    <AccordionItem value="settings" className="data-[state=open]:bg-primary-foreground/5">
                        <AccordionTrigger className="px-4 hover:bg-primary-foreground/10">
                            <Settings size={28} />
                            <span className="ms-4">Settings</span>
                        </AccordionTrigger>
                        <AccordionContent className="flex px-4 mt-1 items-center justify-between text-lg font-bold">
                            <span>Theme</span>
                            <ThemeSwitcher forMenu />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </SheetContent>
        </Sheet >
    )
}

export default HamBurgerMenu;