import BookingExtra from "@/components/booking/BookingExtra";
import BookingTab from "@/components/booking/BookingTab";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Booking Extra || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};

export default function BookingExtraPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <section className="section">
          <div className="container-sub">
            <BookingTab />
            <BookingExtra />
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
