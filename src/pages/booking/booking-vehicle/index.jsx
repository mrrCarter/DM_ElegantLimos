import BookingTab from "@/components/booking/BookingTab";
import BookingVehicles from "@/components/booking/BookingVehicles";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "DM Elegant Limousine || DM Elegant Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limousine Chauffeur Limousine Transport and Car Hire",
};

export default function BookingVehiclePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <section className="section">
          <div className="container-sub">
            <BookingTab />
            <BookingVehicles />
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
