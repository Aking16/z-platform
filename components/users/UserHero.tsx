import Avatar from "../Avatar";
import Hero from "../Hero";

const UserHero = ({ userId }: { userId: string }) => {
  return (
    <div>
      <div className="bg-gradient-to-t from-sky-500 to-sky-300 h-[12.5rem] relative dark:from-neutral-700 dark:to-neutral-500">
        <Hero userId={userId} editable/>
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder editable />
        </div>
      </div>
    </div>
  );
}

export default UserHero;