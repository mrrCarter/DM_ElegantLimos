import BlogSingle from "@/components/blog/BlogSingle";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { allBlogs } from "@/data/blogs";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Blog Single || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};
export default function BlogsSinglePage() {
  let params = useParams();

  const blog = allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BlogSingle blog={blog} />
        <RelatedBlogs />
      </main>
      <Footer1 />
    </>
  );
}
