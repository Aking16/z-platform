import { Container } from "@/components/ui/container";
import Image from "next/image";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex flex-1 justify-around items-center h-screen">
        <Image alt="Z Logo" src="/z.svg" width={450} height={450} />
        {children}
      </div>
    </Container>);
}
