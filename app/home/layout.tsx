"use client"

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Home, Mail, Search, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <Container>
      <div className="flex justify-between">
        <aside className="flex flex-col h-screen sticky top-0 gap-y-5 border-r border-border pe-12">
          <Image priority src={"/z.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />

          <Button size="custom" variant="secondary" className="text-2xl font-bold w-fit">
            <Home size={28} className="me-5" />
            <span className="me-auto">Home</span>
          </Button>
          <Button size="custom" variant="secondary" className="text-2xl font-bold w-fit">
            <User2 size={28} className="me-5" />
            <span className="me-auto">Profile</span>
          </Button>
          <Button size="custom" variant="secondary" className="text-2xl font-bold w-fit">
            <Mail size={28} className="me-5" />
            <span className="me-auto">Messages</span>
          </Button>

          <Button className="text-2xl font-bold px-24">
            <span>Post</span>
          </Button>

          <Button className="mt-auto mb-5" onClick={() => signOut()}>Sign Out</Button>
        </aside>
        <section className="mt-3 w-full">
          {children}
        </section>
        <aside className="border-l border-border ps-12">
          <div className="mt-3 sticky top-0">
            <Input placeholder="Search" className="ps-14 w-[21rem]" />
            <Search className="absolute top-3.5 left-4 text-muted-foreground" size={18} />
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
      </div>
    </Container>);
}
