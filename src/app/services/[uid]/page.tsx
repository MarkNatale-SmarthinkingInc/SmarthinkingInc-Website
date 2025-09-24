import FooterSection from "@/components/global/footer-section";
import {
  ServiceDetailContentSection,
  ServiceDetailHeroSection,
  ServiceDetailOtherServicesSection,
  ServiceDetailWorkSection,
} from "@/components/services";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  const service = await client.getByUID("service", params.uid);
  return generateMeta(service.id);
}

export async function generateStaticParams() {
  const client = createClient();
  const services = await client.getAllByType("service");
  return services.map((service) => ({ uid: service.uid }));
}

const ServiceDetailPage = async ({ params }: { params: { uid: string } }) => {
  const client = createClient();
  const service = await client.getByUID("service", params.uid);
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="service-detail"
    >
      <div id="smooth-content" className="service-detail" data-page="Services">
        <ServiceDetailHeroSection service={service} />
        <ServiceDetailContentSection service={service} />
        <ServiceDetailOtherServicesSection service={service} />
        <ServiceDetailWorkSection service={service} />
        <FooterSection />
      </div>
    </main>
  );
};

export default ServiceDetailPage;
