// index.jsx
import { Link } from "react-router";
import { Map } from "../../common";
import {
  ContactContainer,
  HelpContainer,
  DataContainer,
  MapContainer,
} from "./index.styled";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function Contact() {
  const mockPhoneNumber = "+40700182858";
  const locale = navigator.language || "en-US";
  const region = locale.split("-")[1] || "US";

  const formatPhoneNumber = (phoneNumber) => {
    const formattedPhoneNumber = parsePhoneNumberFromString(
      phoneNumber,
      region
    );
    return formattedPhoneNumber
      ? formattedPhoneNumber.formatInternational()
      : phoneNumber;
  };

  return (
    <ContactContainer>
      <h2>Contact</h2>
      <HelpContainer>
        <h4>How can we help you?</h4>
        <p>If you have a more complicated question, you can:</p>
        <ul>
          <li>
            Look into our <Link to={"/faq"}>FAQ</Link> section
          </li>
          <li>Give us a call</li>
          <li>Meet us at our office</li>
        </ul>
      </HelpContainer>

      <DataContainer>
        <h3>Contact Data</h3>
        <div>
          <p>
            <b>VAULT BANK ROMANIA BUCURESTI</b>
          </p>
          <p>
            Strada Oarecare Nr. 123, Bl. X01, Cod Postal 012345, Bucuresti,
            Romania
          </p>
        </div>
        <div>
          <p>
            Telephone: {formatPhoneNumber(mockPhoneNumber)} or +40-700-1(VAULT)
          </p>
        </div>
        <div>
          <p>Email: Vault@email.com</p>
        </div>
      </DataContainer>

      <MapContainer>
        <Map />
      </MapContainer>
    </ContactContainer>
  );
}

export default Contact;
