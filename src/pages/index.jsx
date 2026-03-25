import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import Features from "@/components/common/features/Features";
import Hero from "@/components/homes/home-1/Hero";
import Process from "@/components/common/process/Process";


import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home || DM Elegant Limos - Chauffeur Limousine Transport with optional Karaoke",
  description:
    "Your Premium Car Service with professional Private Chauffeur",
};
export default function Home() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Hero />
        {/* <Feet /> */}
        <Process />
        <Features />
        {/* <Facts /> */}

      </main>
      <Footer1 />
    </>
  );
}
