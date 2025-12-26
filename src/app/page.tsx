import Image from "next/image";
import NavBar from "@/components/NavBar";
import {Button} from '@/components/ui/button';
import { LoginButton } from "@/components/auth/login-button";
export default function Home() {
  return (
    <div className=" min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <LoginButton >
    <Button size='lg' > Click me  </Button>
    </LoginButton>
    
    </div>
  );
}
