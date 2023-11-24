"use client"

import { Button } from '@/components/ui/button';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { ArrowLeft, Home, Loader2, MoveLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'

const UserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-[24.5rem]">
        <Loader2 className="animate-spin me-2 text-secondary" />
        loading
      </div>
    )
  }

  return (
    <div className=''>
      <div className='flex items-center pb-3 px-2 border-b'>
        <Button size="custom" variant="secondary">
          <ArrowLeft size={20} />
        </Button>
        <h1 className='ms-2 text-lg'> {fetchedUser?.name} </h1>
      </div>
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </div>
  )
}

export default UserPage;