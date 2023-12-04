"use client"

import SideBarLeft from "@/components/layout/SideBarLeft";
import SideNavBar from "@/components/layout/SideNavBar";
import { Container } from "@/components/ui/container";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Bell, Home, User2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: currentUser } = useCurrentUser();

  const routes = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={28} className="xl:me-5" />
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: <User2 size={28} className="xl:me-5" />
    },
    {
      label: "Notifications",
      href: `/notification`,
      icon: <Bell size={28} className="xl:me-5" />,
      alert: currentUser?.hasNotficiation
    }
  ]
  return (
    <Container>
      <div className="flex justify-between">
        <SideNavBar routes={routes} />

        <section className="pt-1 w-full border-x border-border ">
          {children}
        </section>

        <SideBarLeft />
      </div>
    </Container>
  )
}
