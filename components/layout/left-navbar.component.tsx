import Image from "next/image";

export const LeftNavbar = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
        <span className="designation">Full Stack Developer</span>
      </div>
      <Image
        className="me"
        src="/images/me.jpg"
        alt="Me"
        width={200}
        height={200}
      />
      <h2 className="email">Sal Anvarov</h2>
      <h2 className="address">Based in Toronto</h2>
      <p className="copyright">&copy; Sal Anvarov. All Rights Reserved</p>
      <ul className="social-profile d-flex align-items-center flex-wrap justify-content-center">
        <li>
          <a href="https://twitter.com/">
            <i className="lab la-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://dribble.com/">
            <i className="lab la-dribbble"></i>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/">
            <i className="lab la-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/">
            <i className="lab la-github"></i>
          </a>
        </li>
      </ul>
      <a href="#" className="theme-btn">
        <i className="las la-envelope"></i> Hire Me!
      </a>
    </div>
  );
};
