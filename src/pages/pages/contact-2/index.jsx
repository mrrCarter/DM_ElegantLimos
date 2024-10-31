import ContactForm2 from "@/components/contact/ContactForm2";
import Map2 from "@/components/contact/Map2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Contact 2 || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};
export default function ContactPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        <Map2 />
        <ContactForm2 />
      </main>
      <Footer1 />
    </>
  );
}
