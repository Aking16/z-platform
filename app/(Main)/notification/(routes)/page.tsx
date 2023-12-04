"use client"

import NotificationFeed from "@/components/NotificationFeed";
import Header from "@/components/layout/Header";

const NotificationPage = () => {

    return (
        <div>
            <Header title="Notifications" backArrow />
            <NotificationFeed />
        </div>
    )
}

export default NotificationPage;