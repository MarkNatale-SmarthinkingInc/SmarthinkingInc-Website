export default function Header() {
  return (
    <div
      id="menu"
      className="st-xl-7 st-lg-8 st-sm-10 st-xs-18"
      style={{ opacity: 0 }}
    >
      <div className="menu-bg"></div>
      <a href="/" id="logo" className="page-link">
        <img src="/img/svg/logo-white.svg" alt="Smarthinking Inc. white logo" />
        <span>Smarthinking Inc.</span>
      </a>
      <div className="hamburger-wrap st-grid grid-middle">
        <span className="page-name caption White">Home</span>
        <div id="hamburger">
          <img src="/img/svg/icon-plus.svg" alt="white plus icon" />
        </div>
      </div>
    </div>
  );
}
