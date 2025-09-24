import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface ServiceDetailOtherServicesSectionProps {
  service: Content.ServiceDocument;
}

export default async function ServiceDetailOtherServicesSection({
  service,
}: ServiceDetailOtherServicesSectionProps) {
  const client = createClient();
  const allServices = await client.getAllByType("service");

  // Filter out the current service
  const otherServices = allServices.filter((s) => s.uid !== service.uid);

  return (
    <section id="other-services" className="bg-dark stripe-hover">
      <div className="grid-margin">
        <h2 className="sup-title">Other Services</h2>
      </div>
      {otherServices.map((otherService) => {
        const isCurrentService = otherService.uid === service.uid;

        return (
          <PrismicNextLink
            key={otherService.uid}
            document={otherService}
            className={`s-list-item stripe-item ${
              isCurrentService ? "item-disabled" : ""
            }`}
          >
            <div className="stripe-bg"></div>
            <div className="st-xl-8 st-xl-os-10 st-sm-18 st-sm-os-0">
              <div className="f-24 stripe-label">{otherService.data.title}</div>
            </div>
          </PrismicNextLink>
        );
      })}
    </section>
  );
}
