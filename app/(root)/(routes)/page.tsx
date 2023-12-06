"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { LoginForm } from '@/components/forms/LoginForm';
import { SignUpForm } from '@/components/forms/SignUpForm';
import { useTheme } from 'next-themes';

const RootPage = () => {
  const session = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push('/home')
    }
  }, [session?.status, router])


  return (
    <main>
      <h1 className="text-6xl font-bold">
        Happening now
      </h1>
      <h2 className="text-3xl font-bold mt-12">
        Join Today,
      </h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[19rem] mt-6">
            Create account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
              {theme === "dark" ?
                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} />
                :
                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} />
              }
            </DialogTitle>
          </DialogHeader>
          <SignUpForm />
        </DialogContent>
      </Dialog>
      <p className="w-[19rem] text-xs leading-none mt-2">
        By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
      </p>

      <h3 className="mt-16">
        Already have an account?
      </h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[19rem] mt-4" variant="outline">
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
              {theme === "dark" ?
                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} />
                :
                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} />
              }
            </DialogTitle>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default RootPage;