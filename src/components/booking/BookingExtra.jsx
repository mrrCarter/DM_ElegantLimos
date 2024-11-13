// BookingExtra.jsx

import React, { useEffect, useState, useContext } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./BookingContext";

const quantityItem = [
  // ... your quantity items ...
];

const selectItem = [
  // ... your select items ...
];

export default function BookingExtra() {
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useContext(BookingContext);

  const [quantityItems, setQuantityItems] = useState(
    bookingData.selectedExtras?.quantityItems || quantityItem
  );
  const [selectItems, setSelectItems] = useState(
    bookingData.selectedExtras?.selectItems || selectItem
  );
  const [flightNumber, setFlightNumber] = useState(
    bookingData.selectedExtras?.flightNumber || ""
  );
  const [notes, setNotes] = useState(
    bookingData.selectedExtras?.notes || ""
  );

  const handleQuantity = (qty, i) => {
    const items = [...quantityItems];
    const item = items[i];
    if (qty >= 0) {
      item.quantity = qty;
      items[i] = item;
      setQuantityItems(items);
    }
  };

  const handleSelect = (i) => {
    const items = [...selectItems];
    const item = items[i];
    item.selected = !item.selected;
    items[i] = item;
    setSelectItems(items);
  };

  const handleContinue = () => {
    const selectedExtras = {
      flightNumber,
      notes,
      quantityItems: quantityItems.filter((item) => item.quantity > 0),
      selectItems: selectItems.filter((item) => item.selected),
    };

    setBookingData((prev) => ({
      ...prev,
      selectedExtras,
    }));

    navigate("/booking-passenger");
  };

  useEffect(() => {
    // Any additional effects
  }, []);

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30">
            Extra Options
          </h3>
          <div className="form-contact form-comment">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="flight"
                    type="text"
                    placeholder="Flight/Train Number (e.g., LH83822)"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="list-extras">
            {quantityItems.map((elm, i) => (
              <div key={i} className="item-extra">
                <div className="extra-info">
                  <h5 className="text-20-medium color-text mb-5">
                    {elm.name} <span className="price">${elm.price}</span>
                  </h5>
                  <p className="text-14 color-grey">{elm.description}</p>
                </div>
                <div className="extra-quantity">
                  <button
                    onClick={() => handleQuantity(elm.quantity - 1, i)}
                    className="minus"
                  >
                    -
                  </button>
                  <input
                    className="form-control"
                    type="number"
                    value={elm.quantity}
                    onChange={(e) =>
                      handleQuantity(parseInt(e.target.value || 0), i)
                    }
                  />
                  <button
                    onClick={() => handleQuantity(elm.quantity + 1, i)}
                    className="plus"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            {selectItems.map((elm, i) => (
              <div key={i} className="item-extra">
                <div className="extra-info">
                  <h5 className="text-20-medium color-text mb-5">
                    {elm.name} <span className="price">${elm.price}</span>
                  </h5>
                  <p className="text-14 color-grey">{elm.description}</p>
                </div>
                <div className="extra-quantity">
                  <button
                    onClick={() => handleSelect(i)}
                    className={`btn w-100 ${
                      elm.selected ? "btn-primary" : "btn-grey"
                    }`}
                  >
                    {elm.selected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-45">
            <div className="form-contact form-comment">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="notes"
                      rows="5"
                      placeholder="Notes for the Chauffeur..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-30 mb-120">
            <button
              className="btn btn-primary btn-primary-big w-100"
              onClick={handleContinue}
            >
              Continue
              <svg
                className="icon-16 ml-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
