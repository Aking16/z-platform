"use client"

import NotificationFeed from "@/components/NotificationFeed";
import Header from "@/components/layout/Header";

const NotificationPage = () => {

    return (
        <section>
            <Header title="Notifications" backArrow />
            <NotificationFeed />
        </section>
    )
}

export default NotificationPage;