import React from "react";
import Logo from "../../assets/images/header/logo.png";

const Profile = () => {
  return (
    <div className="prt_main_wrapper">
      <div className="prt_home_wrapper">
        <div className="prt_logo_wrapper">
          <a href="#main">
            <img src={Logo} alt="Logo" id="prt_close_tab" />
          </a>
        </div>
        <div className="prt_menu_wrapper">
          <a href="#about" className="prt_top">
            about
          </a>
          <a href="#contact" className="prt_right">
            contact
          </a>
          <a href="#services" className="prt_bottom">
            strength
          </a>
          <a href="#portfolio" className="prt_left">
            portfolio
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7 col-sm-10 col-xs-12 col-lg-offset-6 col-md-offset-5 col-sm-offset-2 col-xs-offset-0">
              <h1>I`m Salim Anvarov</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
