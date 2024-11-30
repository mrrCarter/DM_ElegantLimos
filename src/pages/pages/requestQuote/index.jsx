import RequestQuoteForm from "@/components/requestQuote/RequestQuoteForm";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Request a Quote || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description: "Request a quote from DM Elegant Limo for our luxury transportation services.",
};

export default function RequestQuotePage() {
  return (
    <div className="page-container">
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        <RequestQuoteForm />
      </main>
      <Footer1 />
    </div>
  );
}
