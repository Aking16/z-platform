"use client"

import NotificationFeed from "@/components/NotificationFeed";
import useNotifications from "@/hooks/useNotifications";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const NotificationPage = () => {

    // if (isLoading || !fetchedPost) {
    //     return (
    //         <div className="flex justify-center items-center h-[24.5rem]">
    //             <Loader2 className="animate-spin me-2 text-secondary" />
    //             loading
    //         </div>
    //     )
    // }

    return (
        <div className=''>
            <h1 className="text-center pb-3 border-b"> Notifications </h1>
            <NotificationFeed />
        </div>
    )
}

export default NotificationPage;