import { useCallback, useContext, useEffect, useState } from "react";
import { BookingContext } from "./BookingContext";
import emailjs from "emailjs-com";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { isEmailJsConfigured } from "@/lib/runtimeConfig";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
const TEMPLATE_ID_COMPANY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function BookingReceived() {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const {
    fromAddress,
    toAddress,
    date,
    time,
    passengerInfo,
    vehicle,
    price,
    gratuityPercentage,
    totalPrice,
    cardLast4Digits,
    distanceText,
    durationText,
    tripType,
    numberOfHours,
    orderNumber: storedOrderNumber,
    paymentIntentId,
  } = bookingData;

  const [directionsResponse, setDirectionsResponse] = useState(
    bookingData.directionsResponse || null
  );
  const [emailStatus, setEmailStatus] = useState(
    isEmailJsConfigured(import.meta.env) ? "idle" : "unconfigured"
  );
  const [orderNumber] = useState(() => {
    if (storedOrderNumber) {
      return storedOrderNumber;
    }

    const lastOrderNumber =
      Number.parseInt(window.localStorage.getItem("lastOrderNumber"), 10) || 999;
    const nextOrderNumber = String(lastOrderNumber + 1);
    window.localStorage.setItem("lastOrderNumber", nextOrderNumber);
    return nextOrderNumber;
  });

  useEffect(() => {
    if (!storedOrderNumber) {
      setBookingData((prev) => ({
        ...prev,
        orderNumber,
      }));
    }
  }, [orderNumber, setBookingData, storedOrderNumber]);

  useEffect(() => {
    if (!window.google?.maps || !fromAddress || !toAddress) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: fromAddress,
        destination: toAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirectionsResponse(result);
          return;
        }

        console.error(`Error fetching directions ${status}`);
      }
    );
  }, [fromAddress, toAddress]);

  const sendEmails = useCallback(async () => {
    const templateParams = {
      to_email: passengerInfo?.email || "info@dmelegantlimos.com",
      order_number: `#${orderNumber}`,
      fromAddress,
      toAddress,
      date: date ? new Date(date).toLocaleDateString() : "",
      time: time
        ? new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      first_name: passengerInfo?.firstName || "",
      last_name: passengerInfo?.lastName || "",
      email: passengerInfo?.email || "",
      phone: passengerInfo?.phone || "",
      vehicle: vehicle?.title || "",
      base_price: bookingData.basePrice,
      subtotal: price,
      gratuity_percentage: gratuityPercentage,
      total_price: totalPrice,
      distance: distanceText,
      duration: durationText,
      status: "Paid",
      card_last4: cardLast4Digits, // Added for reference
      trip_type: tripType,
      number_of_hours: numberOfHours,
      flight_number: passengerInfo?.flightNumber,
      car_seat_count: passengerInfo?.carSeatCount,
    };

    const results = await Promise.allSettled([
      emailjs.send(SERVICE_ID, TEMPLATE_ID_CLIENT, templateParams, PUBLIC_KEY),
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_COMPANY,
        { ...templateParams, to_email: "info@dmelegantlimo.com" },
        PUBLIC_KEY
      ),
    ]);

    const failedResults = results.filter((result) => result.status === "rejected");
    if (failedResults.length > 0) {
      throw failedResults[0].reason ?? new Error("Booking confirmation email failed.");
    }
  }, [
    bookingData.basePrice,
    cardLast4Digits,
    date,
    distanceText,
    durationText,
    fromAddress,
    gratuityPercentage,
    numberOfHours,
    orderNumber,
    passengerInfo?.carSeatCount,
    passengerInfo?.email,
    passengerInfo?.firstName,
    passengerInfo?.flightNumber,
    passengerInfo?.lastName,
    passengerInfo?.phone,
    price,
    time,
    toAddress,
    totalPrice,
    tripType,
    vehicle?.title,
  ]);

  useEffect(() => {
    if (!isEmailJsConfigured(import.meta.env) || !passengerInfo?.email) {
      return;
    }

    const receiptStorageKey = paymentIntentId
      ? `booking-confirmation:${paymentIntentId}`
      : `booking-confirmation:${orderNumber}`;

    if (window.localStorage.getItem(receiptStorageKey) === "sent") {
      setEmailStatus("sent");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        await sendEmails();
        if (cancelled) {
          return;
        }
        window.localStorage.setItem(receiptStorageKey, "sent");
        setEmailStatus("sent");
      } catch (error) {
        console.error("Failed to send booking confirmation emails:", error);
        if (!cancelled) {
          setEmailStatus("failed");
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [orderNumber, passengerInfo?.email, paymentIntentId, sendEmails]);

  return (
    <section className="section">
      <div className="container-sub">
        <div className="box-completed-booking">
          <div className="text-center wow fadeInUp">
            <img
              className="mb-20"
              src="/assets/imgs/page/booking/completed.png"
              alt="Booking Confirmation"
            />
            <h4 className="heading-24-medium color-text mb-10">
              {passengerInfo?.firstName}, your booking was submitted successfully!
            </h4>
            <p className="text-14 color-grey mb-40">
              {emailStatus === "sent"
                ? `Booking details have been sent to ${passengerInfo?.email}.`
                : "Your trip details are confirmed and a representative will be in touch shortly."}
            </p>
          </div>
          {emailStatus === "unconfigured" && (
            <div className="alert alert-warning mb-20">
              Confirmation email templates are not configured yet in this
              environment.
            </div>
          )}
          {emailStatus === "failed" && (
            <div className="alert alert-warning mb-20">
              The booking is confirmed, but email delivery needs to be retried.
            </div>
          )}
          {/* Display Booking Details */}
          <div className="booking-details">
            <h5 className="mb-20">Booking Invoice</h5>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Order Number:</strong>
                  </td>
                  <td>#{orderNumber}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Date:</strong>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Passenger Name:</strong>
                  </td>
                  <td>
                    {passengerInfo?.firstName} {passengerInfo?.lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone Number:</strong>
                  </td>
                  <td>{passengerInfo?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{passengerInfo?.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Trip Type:</strong>
                  </td>
                  <td>{tripType}</td>
                </tr>
                {tripType === "Hourly" && (
                  <tr>
                    <td>
                      <strong>Number of Hours:</strong>
                    </td>
                    <td>{numberOfHours}</td>
                  </tr>
                )}
                {tripType === "Airport Pickup" && passengerInfo?.flightNumber && (
                  <tr>
                    <td>
                      <strong>Flight Number:</strong>
                    </td>
                    <td>{passengerInfo.flightNumber}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>Pick Up Address:</strong>
                  </td>
                  <td>{fromAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Drop Off Address:</strong>
                  </td>
                  <td>{toAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pick Up Date:</strong>
                  </td>
                  <td>
                    {date ? new Date(date).toLocaleDateString() : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pick Up Time:</strong>
                  </td>
                  <td>
                    {time
                      ? new Date(time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Vehicle:</strong>
                  </td>
                  <td>{vehicle?.title}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Distance:</strong>
                  </td>
                  <td>{distanceText}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Estimated Duration:</strong>
                  </td>
                  <td>{durationText}</td>
                </tr>
                {/* Note to Driver */}
                {passengerInfo?.notes && (
                  <tr>
                    <td>
                      <strong>Note to Driver:</strong>
                    </td>
                    <td>{passengerInfo.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Price Breakdown */}
            <h6 className="text-16-medium color-text mb-10 mt-30">
              Price Breakdown
            </h6>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>Base Price:</td>
                  <td>${bookingData.basePrice}</td>
                </tr>
                {passengerInfo.carSeatCount > 0 && (
                  <tr>
                    <td>
                      Car Seats ({passengerInfo.carSeatCount} x $25):
                    </td>
                    <td>${bookingData.carSeatCharge}</td>
                  </tr>
                )}
                <tr>
                  <td>Gratuity ({gratuityPercentage}%):</td>
                  <td>${bookingData.gratuityAmount}</td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Total Price:</td>
                  <td>${bookingData.totalPrice}</td>
                </tr>
              </tbody>
            </table>

            <p className="mt-15">
              Status: <strong>Paid</strong>
            </p>
          </div>

          {/* Display Map */}
          {directionsResponse && (
            <div className="mt-20">
              <GoogleMap
                mapContainerStyle={containerStyle}
                options={{
                  disableDefaultUI: true,
                }}
              >
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    suppressMarkers: false,
                  }}
                />
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
