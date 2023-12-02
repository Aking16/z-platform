"use client"

import FollowBar from "@/components/follow-bar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Bell, Dot, Home, Mail, Search, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: currentUser } = useCurrentUser();

  const routes = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={28} className="me-5" />
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: <User2 size={28} className="me-5" />
    },
    {
      label: "Notifications",
      href: `/notification`,
      icon: <Bell size={28} className="me-5" />,
      alert: currentUser?.hasNotficiation
    }
  ]
  return (
    <Container>
      <div className="flex justify-between">
        <aside className="flex flex-col h-screen sticky top-0 gap-y-5 border-r border-border pe-12">
          <Image priority src={"/z.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />

          {routes.map((route) => (
            <Link href={route.href} key={route.label}>
              <Button size="custom" variant="secondary" className="text-2xl font-bold w-fit relative">
                {route.alert && <Dot size={70} className="absolute -top-5 -left-4 text-secondary" />}
                {route.icon}
                <span className="me-auto">{route.label}</span>
              </Button>
            </Link>
          ))}

          <Button className="text-2xl font-bold px-24">
            <span>Post</span>
          </Button>

          <Button className="mt-auto mb-5" variant="outline" onClick={() => signOut()}>Sign Out</Button>
        </aside>
        <section className="mt-3 w-full">
          {children}
        </section>
        <aside className="border-l border-border ps-12">
          <div className="mt-3 sticky top-0">
            <Input placeholder="Search" className="ps-14 w-[21rem]" />
            <Search className="absolute top-3.5 left-4 text-muted-foreground" size={18} />
          </div>
          <FollowBar />
          <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5">
            <h2 className="text-xl text-center">Made by Amirhossein Amiri</h2>
            <p className="text-lg text-right mt-4">این پروژه برای درس توسعه وب طراحی شده است</p>
            <p className="text-lg text-justify mb-2">This project was made for the Web Development.</p>
            <Button className="my-2 w-fit px-10 py-0">
              Github
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  )
}
