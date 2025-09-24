import type { KeyTextField } from "@prismicio/client";

interface NewsletterBoxProps {
  title?: KeyTextField;
  subtitle?: KeyTextField;
  variant?: "blog-detail" | "blog-listing";
  className?: string;
}

export default function NewsletterBox({
  title,
  subtitle,
  variant = "blog-detail",
  className = "",
}: NewsletterBoxProps) {
  const titleClass = variant === "blog-detail" ? "f-28" : "f-40";
  const subtitleClass = variant === "blog-detail" ? "caption" : "sup-title";
  const wrapperClass =
    variant === "blog-detail" ? "newsletter-box scroll-fix" : "";

  return (
    <div className={`${wrapperClass} ${className}`.trim()}>
      {subtitle && <h3 className={subtitleClass}>{subtitle}</h3>}
      {!subtitle && variant === "blog-detail" && (
        <h3 className="caption">Newsletter</h3>
      )}
      <h2 className={titleClass}>{title}</h2>
      <form action="/action_page.php" className="newsletter">
        <div className="input-box">
          <input
            type="email"
            placeholder="Your email..."
            name="mail"
            required
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
