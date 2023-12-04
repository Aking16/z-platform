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

            <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5">
                <h2 className="text-xl text-center">Made by Amirhossein Amiri</h2>
                <p className="text-lg text-right mt-4">این پروژه برای درس توسعه وب طراحی شده است</p>
                <p className="text-lg text-justify mb-2">This project was made for the Web Development.</p>
                <Button className="my-2 w-fit px-10 py-0">
                    Github
                </Button>
            </div>
        </aside>
    )
}

export default SideBarLeft;