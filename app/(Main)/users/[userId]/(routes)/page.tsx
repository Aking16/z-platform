"use client"

import PostFeed from '@/components/post/PostFeed';
import { Button } from '@/components/ui/button';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const UserPage = () => {
  const params = useParams();
  const userId = params.userId.toString();
  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-[24.5rem]">
        <Loader2 className="animate-spin me-2 text-secondary" />
        loading
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center pb-3 px-2 border-b'>
        <Button size="custom" variant="secondary">
          <ArrowLeft size={20} />
        </Button>
        <h1 className='ms-2 text-lg'> {fetchedUser?.name} </h1>
      </div>
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </div>
  )
}

export default UserPage;