import React from "react";
import "../Contact.css";

const ContactCard = props => {
  return (
    <div className="prt_contact_details_box details_box1">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
    </div>
  );
};

export default ContactCard;
