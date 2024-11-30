import FAQ from "@/components/homes/home-1/Faq";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import MetaComponent from "@/components/common/MetaComponent";
import MobailHeader1 from "@/components/headers/MobailHeader1";

const metadata = {
  title: "FAQ || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description: "Learn more about DM Elegant Limo's services, policies, and more.",
};

export default function InvoicePage() {
  return (
    <div className="page-container">
      <MetaComponent meta={metadata} />
      <MobailHeader1 />
      <Header1 />
      <main className="main">
        <FAQ />
      </main>
      <Footer1 />
    </div>
  );
}
