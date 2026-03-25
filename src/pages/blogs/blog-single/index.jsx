import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import ComingSoon from "@/components/ComingSoon";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Blog Single || DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
  description:
    "DM Elegant Limo - Chauffeur Limousine Transport and Car Hire",
};
export default function BlogsSinglePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        {/* <BlogSingle blog={blog} /> */}
        {/* <RelatedBlogs /> */}
        <ComingSoon />  
      </main>
      <Footer1 />
    </>
  );
}
