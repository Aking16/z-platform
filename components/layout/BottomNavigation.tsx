import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";

interface BottomNavigationProps {
    routes: {
        label: string;
        href: string;
        icon: ReactNode;
        alert?: boolean;
    }[]
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ routes }) => {
    return (
        <nav className="flex justify-between px-4 border-t w-full fixed bottom-0 left-0 bg-primary z-50 md:hidden">
            {routes.map((route) => (
                <Link href={route.href} key={route.label}>
                    <Button key={route.label} size="custom" variant="secondary" className="text-2xl font-bold w-fit relative">
                        {route.alert && <Dot size={70} className="absolute -top-5 -left-3 text-secondary" />}
                        {route.icon}
                    </Button>
                </Link>
            ))}
        </nav>
    )
}

export default BottomNavigation;