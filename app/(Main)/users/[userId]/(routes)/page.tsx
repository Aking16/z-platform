"use client"

import Header from '@/components/layout/Header';
import PostFeed from '@/components/post/PostFeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { Loader2 } from 'lucide-react';
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
      <Header title={fetchedUser.name} backArrow />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </div>
  )
}

export default UserPage;