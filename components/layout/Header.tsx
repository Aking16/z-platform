import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    title: string;
    backArrow?: boolean;
    center?: boolean;
    hasBorder?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, backArrow, center, hasBorder }) => {
    return (
        <div className={`flex pb-3 sticky top-0 pt-2 bg-primary/10 z-50 backdrop-blur-sm ${center && "justify-center"} ${hasBorder && "border-b"}`}>
            {backArrow &&
                <Link href="/home" className="text-secondary ms-1 p-2 rounded-full hover:bg-primary-foreground/10 dark:text-white" >
                    <ArrowLeft size={20} />
                </Link>
            }
            <h1 className="font-bold text-xl ms-6 pb-2"> {title} </h1>
        </div>
    )
}

export default Header;