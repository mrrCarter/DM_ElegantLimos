import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description: "Contact DM Elegant Limo for inquiries and bookings.",
};

export default function ContactPage1() {
  return (
    <div className="page-container">
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        {/* <BreadCumb /> */}
        {/* <Offices /> */}
        {/* <Map /> */}
        <ContactForm />
      </main>
      <Footer1 />
    </div>
  );
}
