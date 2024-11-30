import { features7 } from "@/data/features";

export default function Features2() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Luxury Transportation Services in Boston
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              Experience the finest luxury chauffeur services in Boston. Whether you're traveling for business or leisure, we offer a range of services to meet your needs. Our professional drivers ensure a safe and comfortable journey, with fixed prices and exceptional service.
            </p>
            <p>
              Our services include:
            </p>
            {/* <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src="/assets/imgs/page/services/airport_wait.webp" alt="Airport Transfer" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Airport Transfers
              </h3>
              <p className="text-16 color-text">
                Arrive at your destination in style with our luxury airport transfer service. We offer meet and greet services, flight tracking, and one hour of complimentary wait time to ensure a seamless experience. Ideal for both business and leisure travelers.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90 flex-row-reverse">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src="/assets/imgs/page/services/SUV_Fullspeed.webp" alt="Point-to-Point" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-left wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Point-to-Point
              </h3>
              <p className="text-16 color-text">
                Our point-to-point service offers a convenient and efficient way to travel between locations in Boston. Whether it's a meeting, a dinner, or a shopping trip, our professional drivers will get you there on time and in comfort.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src="/assets/imgs/page/services/chaufferu_waiting.webp" alt="Hourly Service" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Hourly Service
              </h3>
              <p className="text-16 color-text">
                Enjoy the flexibility of our hourly service, perfect for those who need a chauffeur on standby. Whether you're attending multiple meetings or exploring the city, our service adapts to your schedule.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90 flex-row-reverse">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src="/assets/imgs/page/services/client_waiting.webp" alt="Corporate Travel" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-left wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Corporate Travel
              </h3>
              <p className="text-16 color-text">
                Impress your clients and colleagues with our corporate travel services. We provide reliable and professional transportation solutions tailored to the needs of business travelers.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90 mb-120">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src="/assets/imgs/page/services/blackSUV_parked.webp" alt="Special Events" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Special Events
              </h3>
              <p className="text-16 color-text">
                Make your special occasions unforgettable with our luxury transportation services. From weddings to proms, we ensure a memorable experience with our elegant vehicles and professional chauffeurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
