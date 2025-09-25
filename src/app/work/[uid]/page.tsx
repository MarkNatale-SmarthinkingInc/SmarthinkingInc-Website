import FooterSection from "@/components/global/footer-section";
import WorkDetailContentSection from "@/components/works/work-detail-content-section";
import WorkDetailCtaSection from "@/components/works/work-detail-cta-section";
import WorkDetailHeroSection from "@/components/works/work-detail-hero-section";
import WorkDetailMainVideoSection from "@/components/works/work-detail-main-video-section";
import WorkDetailRelatedWorkSection from "@/components/works/work-detail-related-work-section";
import WorkDetailTestimonialsSection from "@/components/works/work-detail-testimonials-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const client = createClient();
  const work = await client.getByUID("work", uid);
  return generateMeta(work.id);
}

export async function generateStaticParams() {
  const client = createClient();
  const works = await client.getAllByType("work");
  return works.map((work) => ({ uid: work.uid }));
}

const WorkDetailPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  const client = createClient();
  const work = await client.getByUID("work", uid);
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="work-detail"
    >
      <div id="smooth-content" className="work-detail" data-page="Work">
        <WorkDetailHeroSection work={work} />
        <WorkDetailMainVideoSection work={work} />
        <WorkDetailContentSection work={work} />
        <WorkDetailTestimonialsSection work={work} />
        <WorkDetailRelatedWorkSection work={work} />
        <WorkDetailCtaSection work={work} />
        <FooterSection />
      </div>
    </main>
  );
};

export default WorkDetailPage;
