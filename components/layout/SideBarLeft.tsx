import FollowBar from "@/components/FollowBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SideBarLeft = () => {
    return (
        <aside className="ps-4 hidden md:block xl:ps-8">
            <div className="sticky top-0 bg-primary z-50 pb-3 pt-2">
                <Input placeholder="Search" className="ps-14 lg:w-[21rem]" />
                <Search className="absolute top-5 left-4 text-muted-foreground" size={18} />
            </div>

            <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5 gap-y-4">
                <p className='text-center font-bold text-xl'>Who to follow</p>
                <FollowBar />
            </div>

            <ul className="flex flex-col list-disc px-5 py-2 bg-background rounded-2xl mt-5">
                <h2 className="text-xl text-center">Made by
                    <a href="https://github.com/Aking16" 
                    target="_blank" 
                    className="ms-1 text-secondary hover:text-secondary/80">
                        Amirhossein Amiri
                    </a>
                </h2>
                <h3 className="text-lg mt-4">Built With:</h3>
                <li className="text-md text-muted-foreground ms-4">TypeScript</li>
                <li className="text-md text-muted-foreground ms-4">NextJS</li>
                <li className="text-md text-muted-foreground ms-4">React</li>
                <li className="text-md text-muted-foreground ms-4">PostgreSQL</li>
                <li className="text-md text-muted-foreground ms-4">Prisma</li>
                <li className="text-md text-muted-foreground ms-4">Bcrypt</li>
                <li className="text-md text-muted-foreground ms-4">Tailwind</li>
                <li className="text-md text-muted-foreground ms-4 mb-2">ShadcnUI</li>
                <Button className="my-2 px-10 py-0">
                    Github
                </Button>
            </ul>
        </aside>
    )
}

export default SideBarLeft;