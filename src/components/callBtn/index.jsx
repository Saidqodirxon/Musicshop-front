import { FaPhone } from "react-icons/fa";
import "./style.scss";

function CallButton() {
  return (
    <div className="call-button-wrapper">
      <div className="call-pulse"></div>
      <a
        href="tel:+998993062020"
        className="call-btn"
        aria-label="Call phone number"
      >
        <FaPhone className="call-icon" />
      </a>
    </div>
  );
}

export default CallButton;
