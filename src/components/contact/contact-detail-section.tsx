import { PrismicNextImage } from "@prismicio/next";

interface ContactDetailProps {
  data: import("@prismicio/client").Content.ContactDocumentData;
}

export default function ContactDetailSection({ data }: ContactDetailProps) {
  return (
    <section id="contact-detail" className="grid-margin st-grid xs-wrap fadeIn">
      <div className="st-xl-10 st-sm-7 st-xs-18 st-grid sm-wrap ">
        <div className="st-xl-4 st-sm-7 st-xs-18 xs-both-1">
          <h2 className="f-60">{data.contact_title}</h2>
        </div>
        <div className="st-xl-5 st-xl-os-1 st-sm-7 st-sm-os-0 st-xs-18 fadeUp">
          <figure className="sm-top-1">
            <PrismicNextImage field={data.contact_image} />
          </figure>
          <address>
            <h3 className="sup-title">General inquiries</h3>
            <a className="f-20" href={`mailto:${data.general_inquiries_email}`}>
              {data.general_inquiries_email}
            </a>
            <br />
            <a className="f-20" href={`tel:${data.general_inquiries_phone}`}>
              {data.general_inquiries_phone}
            </a>
          </address>
          <address>
            <h3 className="sup-title">Press inquiries</h3>
            <a className="f-20" href={`mailto:${data.press_inquiries_email}`}>
              {data.press_inquiries_email}
            </a>
            <br />
            <a className="f-20" href={`tel:${data.press_inquiries_phone}`}>
              {data.press_inquiries_phone}
            </a>
          </address>
        </div>
      </div>
      <div id="contact-form" className="st-xl-8 st-sm-11 st-xs-18 xs-top-3">
        <form action="/action_page.php" className="fadeUp">
          <input
            className="text-box"
            type="text"
            id="fName"
            name="fName"
            placeholder="Full name"
            required
          />
          <input
            className="text-box"
            type="text"
            id="cName"
            name="cName"
            placeholder="Company Name"
            required
          />
          <input
            className="text-box"
            type="email"
            placeholder="Email"
            name="mail"
            required
          />
          <input
            className="text-box"
            type="tel"
            placeholder="Phone"
            name="phone"
            required
          />
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Message"
          ></textarea>
          <div className="form-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
