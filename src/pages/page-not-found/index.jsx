import NotFound from "@/components/404";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Not Found || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};

export default function PageNotFoundPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <NotFound />
      </main>
      <Footer1 />
    </>
  );
}
