// WhatsAppFloatingButton.jsx

import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing FontAwesome icon

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/17817719069"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppFloatingButton;