import useUsers from '@/hooks/useUsers';
import { Loader2 } from 'lucide-react';
import Avatar from './Avatar';

export default function FollowBar() {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading || !users) {
    return (
      <div className="flex justify-center items-center h-[10rem]">
        <Loader2 className="animate-spin me-2 text-secondary" />
        loading
      </div>
    )
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <>
      {
        users.map((user: Record<string, any>) => (
          <div key={user.id} className="flex flex-row gap-4">
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-neutral-500 text-sm dark:text-neutral-400">@{user.username}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
