import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Service Single || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
};
export default function ServiceSinglePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        {/* <Breadcumb service={service} /> */}
        {/* <SearchBox service={service} /> */}
        <Features2 />
        <Features1 />
      </main>
      <Footer1 />
    </>
  );
}
