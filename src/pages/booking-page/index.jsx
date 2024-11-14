// pages/booking-page/index.jsx

import BookingPage from "@/components/booking/BookingPage";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Booking || DM Elegant Limousine Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limousine Chauffeur Limousine Transport and Car Hire",
};

export default function BookingPageWrapper() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <BookingPage />
      <Footer1 />
    </>
  );
}
