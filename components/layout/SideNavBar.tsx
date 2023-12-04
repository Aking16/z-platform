import { Dot, Feather, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
    return (
        <aside className="flex flex-col h-screen sticky top-0 gap-y-5 pe-4 xl:pe-8">
            <Image priority src={"/z.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />

            {routes.map((route) => (
                <Link href={route.href} key={route.label}>
                    <Button key={route.label} size="custom" variant="secondary" className="text-2xl font-bold w-fit relative">
                        {route.alert && <Dot size={70} className="absolute -top-5 -left-4 text-secondary" />}
                        {route.icon}
                        <span className="me-auto hidden xl:block">{route.label}</span>
                    </Button>
                </Link>
            ))}

            <Button className="text-2xl font-bold xl:px-24">
                <span className="hidden xl:block">Post</span>
                <Feather className="xl:hidden" />
            </Button>

            <Button className="mt-auto mb-5" variant="outline" onClick={() => signOut()}>
                <LogOut className="xl:hidden" />
                <span className="hidden xl:block">Sign Out</span>
            </Button>
        </aside>
    )
}

export default SideNavBar;