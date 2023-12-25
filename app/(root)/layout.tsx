"use client"

import Logo from "@/components/layout/Logo";
import { Container } from "@/components/ui/container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <main className='flex flex-col flex-1 justify-around items-center text-center h-screen md:flex-row md:text-start'>
        <Logo size={450} />
        {children}
      </main>
    </Container>);
}
