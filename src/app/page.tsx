import Image from "next/image";
import HeroSection from "@/components/hero/HeroSection";
import AboutJoyJuncture from "@/components/AboutJoyJuncture";
import ChoosePlayStyle from "@/components/ChoosePlayStyle";
import WhatsHappeningNow from "@/components/WhatsHappeningNow";
import ProofOfJoy from "@/components/ProofOfJoy";
import GamificationTeaser from "@/components/GamificationTeaser";
import BigFooter from "@/components/BigFooter";



export default function Home() {

  return (
    <>
      
        <HeroSection />
        <AboutJoyJuncture />
        <ChoosePlayStyle />
        <WhatsHappeningNow />
        <ProofOfJoy />
        <GamificationTeaser />
        <BigFooter />
     
    </>
  );
}
