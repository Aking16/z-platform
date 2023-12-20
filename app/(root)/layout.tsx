"use client"

import { Container } from "@/components/ui/container";
import { useTheme } from "next-themes";
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <Container>
      <main className='flex flex-col flex-1 justify-around items-center text-center h-screen md:flex-row md:text-start'>
        {theme === "dark" ?
          <Image priority src={"/z-light.svg"} alt="Z logo" width={450} height={450} loading="eager" />
          :
          <Image priority src={"/z-dark.svg"} alt="Z logo" width={450} height={450} loading="eager" />
        }
        {children}
      </main>
    </Container>);
}
