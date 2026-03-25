export const BOOKING_STORAGE_KEY = "dm-elegant-limos-booking";

export const TRIP_TYPES = [
  "Point-to-Point",
  "Round Trip",
  "Hourly",
  "Airport Pickup",
];

export const DEFAULT_PASSENGER_INFO = {
  passengers: 1,
  luggage: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  carSeatCount: 0,
  flightNumber: "",
};

export const DEFAULT_BOOKING_DATA = {
  tripType: "Point-to-Point",
  fromAddress: "",
  toAddress: "",
  date: null,
  time: null,
  passengerInfo: DEFAULT_PASSENGER_INFO,
  vehicle: null,
  price: "0.00",
  basePrice: "0.00",
  carSeatCharge: "0.00",
  gratuityAmount: "0.00",
  numberOfHours: 3,
  distanceText: "",
  durationText: "",
  distanceValue: null,
  durationValue: null,
  directionsResponse: null,
  selectedExtras: null,
  cardLast4Digits: null,
  paymentIntentId: null,
  orderNumber: null,
  gratuityPercentage: 20,
  totalPrice: "0.00",
  currentStep: 1,
  highestStep: 1,
};

const HOURLY_RATES = {
  "Luxury Class": 95,
  "SUV Class": 120,
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const formatPrice = (value) => toNumber(value).toFixed(2);

export function calculateTripFare({
  vehicleTitle,
  distanceValue,
  durationValue,
}) {
  const distanceInMiles = distanceValue ? distanceValue / 1609.34 : 0;
  const durationInMinutes = durationValue ? durationValue / 60 : 0;
  const isLuxuryClass = vehicleTitle === "Luxury Class";

  const minimumFare = isLuxuryClass ? 95 : 120;
  const baseRatePerMile = isLuxuryClass ? 3.75 : 4.5;
  const baseRatePerMinute = 1.5;

  const fare = Math.max(
    minimumFare,
    distanceInMiles * baseRatePerMile +
      durationInMinutes * baseRatePerMinute
  );

  return formatPrice(fare);
}

export function deriveBookingPricing(bookingData) {
  const baseRidePrice =
    bookingData.tripType === "Hourly" && bookingData.vehicle?.title
      ? (HOURLY_RATES[bookingData.vehicle.title] ?? HOURLY_RATES["Luxury Class"]) *
        Math.max(3, Number.parseInt(bookingData.numberOfHours, 10) || 3)
      : toNumber(bookingData.price);

  const carSeatCharge =
    (Number.parseInt(bookingData.passengerInfo?.carSeatCount, 10) || 0) * 25;
  const subtotal = baseRidePrice + carSeatCharge;
  const gratuityPercentage = Math.max(
    0,
    Number.parseInt(bookingData.gratuityPercentage, 10) || 0
  );
  const gratuityAmount = subtotal * (gratuityPercentage / 100);
  const totalPrice = subtotal + gratuityAmount;

  return {
    price: formatPrice(subtotal),
    basePrice: formatPrice(baseRidePrice),
    carSeatCharge: formatPrice(carSeatCharge),
    gratuityAmount: formatPrice(gratuityAmount),
    totalPrice: formatPrice(totalPrice),
    gratuityPercentage,
  };
}

export function normalizeBookingData(rawBookingData = {}) {
  const merged = {
    ...DEFAULT_BOOKING_DATA,
    ...rawBookingData,
    passengerInfo: {
      ...DEFAULT_PASSENGER_INFO,
      ...(rawBookingData.passengerInfo ?? {}),
    },
  };

  const pricing = deriveBookingPricing(merged);
  const currentStep = Math.min(
    4,
    Math.max(1, Number.parseInt(merged.currentStep, 10) || 1)
  );
  const highestStep = Math.min(
    4,
    Math.max(currentStep, Number.parseInt(merged.highestStep, 10) || 1)
  );

  return {
    ...merged,
    ...pricing,
    currentStep,
    highestStep,
    directionsResponse: rawBookingData.directionsResponse ?? null,
  };
}

export function loadBookingData() {
  if (typeof window === "undefined") {
    return normalizeBookingData();
  }

  try {
    const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);
    return raw ? normalizeBookingData(JSON.parse(raw)) : normalizeBookingData();
  } catch {
    return normalizeBookingData();
  }
}

export function persistBookingData(bookingData) {
  if (typeof window === "undefined") {
    return;
  }

  const { directionsResponse: _directionsResponse, ...serializableState } =
    bookingData;

  window.localStorage.setItem(
    BOOKING_STORAGE_KEY,
    JSON.stringify(serializableState)
  );
}
