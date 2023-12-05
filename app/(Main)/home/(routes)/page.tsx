"use client"

import { PostForm } from '@/components/forms/PostForm';
import Header from '@/components/layout/Header';
import PostFeed from '@/components/post/PostFeed';
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  return (
    <section>
      <Header title="Home" center hasBorder/>
      <PostForm placeHolder="What's happening?!"/>
      <Separator className='mt-5' />
      <PostFeed />
    </section>
  )
}

export default HomePage;