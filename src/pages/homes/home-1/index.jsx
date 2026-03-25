import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import Features from "@/components/common/features/Features";
import Hero from "@/components/homes/home-1/Hero";
import Process from "@/components/common/process/Process";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home 1 || DM Elegant Limousine",
  description:
    "DM Elegant Limousine",
};
export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <MobailHeader1 />
      <main className="main">
        <Hero />
        {/* <Partners /> */}
        {/* <Feet /> */}
        <Process />
        <Features />
        {/* <Facts /> */}
        {/* <Service /> */}
        {/* <Testimonials /> */}
        {/* <Cta />
        <Blogs />
        <Faq />
        <DownloadApp /> */}
      </main>
      <Footer1 />
    </>
  );
}
