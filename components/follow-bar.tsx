import React from 'react'
import { Button } from './ui/button'
import useUsers from '@/hooks/useUsers'
import Avatar from './avatar';

export default function FollowBar() {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5 gap-y-4">
      <p className='text-center font-bold text-xl'>Who to follow</p>
      {users.map((user: Record<string, any>) => (
        <div key={user.id} className="flex flex-row gap-4">
          <Avatar userId={user.id} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">{user.name}</p>
            <p className="text-neutral-400 text-sm">@{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
