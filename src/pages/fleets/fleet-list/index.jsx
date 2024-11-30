import FeetList1 from "@/components/fleet-list/FeetList1";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
import BreadCumb from "@/components/fleet-list/BreadCumb";
const metadata = {
  title:
    "Fleet List || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
};
export default function FleetListPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <BreadCumb />
      <main className="main">
        <FeetList1 />
      </main>
      <Footer1 />
    </>
  );
}
