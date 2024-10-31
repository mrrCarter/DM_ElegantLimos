import FleetList4 from "@/components/fleet-list/FleetList4";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Fleet List 4 || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};
export default function FleetListPage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <FleetList4 />
      </main>
      <Footer1 />
    </>
  );
}
