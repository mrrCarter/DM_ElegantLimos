import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/otherPages/about/Banner";
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
        {/* <Breadcumb /> */}
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
