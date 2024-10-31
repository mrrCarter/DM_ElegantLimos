import { useEffect } from "react";
import emailjs from 'emailjs-com'; // Import EmailJS

const infoData = [
  { id: 1, label: "Order Number", value: "#4039" },
  { id: 2, label: "Date", value: "Thu, Oct 06, 2022" },
];

const rideData = [
  { id: 1, topText: "Pick Up Address", bottomText: "London City Airport (LCY)" },
  { id: 2, topText: "Drop Off Address", bottomText: "London City Airport (LCY)" },
  { id: 3, topText: "Pick Up Date", bottomText: "Thu, Oct 06, 2022" },
  { id: 4, topText: "Pick Up Time", bottomText: "6 PM : 15" },
];

const personalData = [
  { id: 1, topText: "First name", bottomText: "Ali" },
  { id: 2, topText: "Last name", bottomText: "Tufan" },
  { id: 3, topText: "Email", bottomText: "creativelayers088@gmail.com" },
  { id: 4, topText: "Phone", bottomText: "+09 383 829 91" },
  { id: 5, topText: "Address line 1", bottomText: "" },
  { id: 6, topText: "Address line 2", bottomText: "" },
  { id: 7, topText: "City", bottomText: "London" },
  { id: 8, topText: "State/Province/Region", bottomText: "" },
  { id: 9, topText: "ZIP code/Postal code", bottomText: "95833" },
  { id: 10, topText: "Country", bottomText: "UK" },
  { id: 11, topText: "Special Requirements", bottomText: "" },
];

export default function BookingRecieved() {
  useEffect(() => {
    // Construct the email content
    const templateParams = {
      to_email: 'info@dmelegantlimos.com',
      order_number: infoData[0].value,
      date: infoData[1].value,
      pick_up_address: rideData[0].bottomText,
      drop_off_address: rideData[1].bottomText,
      pick_up_date: rideData[2].bottomText,
      pick_up_time: rideData[3].bottomText,
      first_name: personalData[0].bottomText,
      last_name: personalData[1].bottomText,
      email: personalData[2].bottomText,
      phone: personalData[3].bottomText,
      city: personalData[6].bottomText,
      zip: personalData[8].bottomText,
      country: personalData[9].bottomText
    };

    // Send email with EmailJS
    emailjs.send('service_0edy7vs', 'template_knkkpvf', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  }, []);

  return (
    <section className="section">
      <div className="container-sub">
        <div className="box-completed-booking">
          <div className="text-center wow fadeInUp">
            <img
              className="mb-20"
              src="/assets/imgs/page/booking/completed.png"
              alt="luxride"
            />
            <h4 className="heading-24-medium color-text mb-10">
              System, your order was submitted successfully!
            </h4>
            <p className="text-14 color-grey mb-40">
              Booking details have been sent to: info@dmelegantlimos.com, and a representative will be with you momentarily.
            </p>
          </div>
          {/* Your booking info display code here */}
        </div>
      </div>
    </section>
  );
}
