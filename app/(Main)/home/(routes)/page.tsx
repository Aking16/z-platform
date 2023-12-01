"use client"

import { PostForm } from '@/components/forms/PostForm';
import PostCard from '@/components/post/PostCard';
import PostFeed from '@/components/post/PostFeed';
import { Separator } from '@/components/ui/separator';
import usePosts from '@/hooks/usePosts';

const HomePage = () => {
  return (
    <div className=''>
      <h1 className="text-center pb-3 border-b"> Home </h1>
      <PostForm placeHolder="What's happening?!"/>
      <Separator className='mt-5' />
      <PostFeed />
    </div>
  )
}

export default HomePage;