import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Facts from "@/components/common/facts/Facts";
import Features2 from "@/components/common/features/Features";
import Testimonials from "@/components/common/testimonials/Testimonials";
import DownloadApp from "@/components/common/downloadApp/DownloadApp";
import Banner from "@/components/otherPages/about/Banner";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import Faq from "@/components/otherPages/about/Faq";
import Features from "@/components/otherPages/about/Features";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "About || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
};
export default function AboutPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Banner />
        <Features />
        {/* <Facts />
        <Features2 /> */}
        {/* <Process /> */}
        {/* <Testimonials />
        <Partners />
        <Faq />
        <DownloadApp /> */}
      </main>
      <Footer1 />
    </>
  );
}
