import React, { useEffect, useState } from "react";
import { apiGlobal } from "../Api/ApiGlobal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Statistic = () => {
  const [dataDevicesStatistics, setDataDevicesStatistics] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [oneLastData, setOneLastData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/data/statistics/devices`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setDataDevicesStatistics(data));

    fetch(`${apiGlobal}/mqtt/lastdata`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLastData(data);
          setLoader(false);
        }
      });
  }, []);

  const presentDate = new Date();

  const checkingData = (time) => {
    if (
      new Date(time).getFullYear() == presentDate.getFullYear() &&
      new Date(time).getMonth() == presentDate.getMonth()
    ) {
      return presentDate.getDate() - new Date(time).getDate();
    }
  };

  const getLastData = (imei) => {
    fetch(`${apiGlobal}/mqtt/lastdata/${imei}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOneLastData(data);
        }
      });
  };

  const items = [
    lastData.map((element, index) => {
      const time = new Date(element.time);
      time.setHours(time.getHours() - 5);
      return (
        <div className="col-md-4 col-md-4-spinner col-xl-3 w-100" key={index}>
          <div className="card bg-c-blue order-card  lastdata-card-border">
            <div className="card-block">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src="../../src/assets/images/location.png"
                  alt="location"
                  width="25"
                  height="25"
                  className="me-auto"
                  onClick={() => navigate(`lastdata/location/${element.imei}`)}
                />
                <h2 className="m-b-20 fs-5 heading-lastdata time-lastdata">
                  {element.name}
                </h2>
                <img
                  src="../../src/assets/images/data-backup.png"
                  alt="location"
                  width="33"
                  height="33"
                  className="ms-auto"
                  onClick={() => navigate(`lastdata/data/${element.imei}`)}
                />
              </div>

              <span
                className={
                  checkingData(element.time) == 0
                    ? "underline-success"
                    : checkingData(element.time) <= 3
                    ? "underline-warning"
                    : "underline-danger"
                }
              ></span>

              <div
                onClick={() => getLastData(element.imei)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <p className="text-right m-1">
                  <span className="fs-6 time-lastdata lastdata-desc">
                    Havo temperaturasi : {element.airTemp}°C
                  </span>
                </p>

                <p className="text-right m-1">
                  <span className="fs-6 time-lastdata lastdata-desc">
                    Tuproq namligi : {element.soilHumidity}%
                  </span>
                </p>

                <p className="text-right m-1">
                  <span className="fs-6 time-lastdata lastdata-desc">
                    Havo bosimi : {element.airPressure}kPa
                  </span>
                </p>
                <p className="text-right mt-2">
                  <span className="fs-6 time-lastdata">
                    {new Date().getDate() == new Date(element.time).getDate() &&
                    new Date().getFullYear() ==
                      new Date(element.time).getFullYear() &&
                    new Date().getMonth() == new Date(element.time).getMonth()
                      ? String(element.time).slice(11, 19)
                      : moment(time).format("L") +
                        " " +
                        String(element.time).slice(11, 19)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }),
  ];

  return (
    <main id="main" className="main">
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog table-location-width modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header lastdata-close">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="m-auto">
                {oneLastData.map((item, index) => {
                  return (
                    <div className="one-lastdata-all-wrapper" key={index}>
                      <h3 className="one-lastdata-heading">{item.name}</h3>
                      <div className="one-lastdata-wrapper">
                        <div className="d-flex flex-wrap onelast-data-wrapper">
                          <p className="m-0 onelast-data-desc">
                            Shamol yo'nalishi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.windDirection}°C
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Shamol tezligi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.windSpeed}m/s
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Tuproq temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.soilTemp}°C
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Tuproq namligi:{" "}
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.soilHumidity} %
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Havo temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.airTemp}°C
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">Havo namligi:</p>
                          <p className="m-0 onelast-data-desc">
                            {item.airHumidity}%
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">Havo bosimi:</p>
                          <p className="m-0 onelast-data-desc">
                            {item.airPressure} kPa
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Barg temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.leafTemp}°C
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">Barg namligi:</p>
                          <p className="m-0 onelast-data-desc">
                            {item.leafHumidity}%
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">
                            Yomg'ir qalingligi:
                          </p>
                          <p className="m-0 onelast-data-desc">
                            {item.rainHeight} mm
                          </p>
                        </div>

                        <div className="d-flex onelast-data-wrapper flex-wrap">
                          <p className="m-0 onelast-data-desc">Sensor turi:</p>
                          <p className="m-0 onelast-data-desc">
                            {item.typeSensor}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
            {loader ? (
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <>
                <h2 className="statis-heading">Oxirgi ma'lumotlar</h2>
                {lastData.length == 0 ? (
                  <div
                    className="alert alert-info fs-4 fw-semibold"
                    role="alert"
                  >
                    Hozircha ma'lumot kelmadi!
                  </div>
                ) : (
                  lastData.length > 0 && (
                    <AliceCarousel
                      className="alice-carousel"
                      autoPlayStrategy="all"
                      animationDuration="2000"
                      items={items}
                      mouseTracking
                      disableButtonsControls={true}
                    />
                  )
                )}

                <h2 className="statis-heading mt-4">Ishlagan qurilmalar</h2>
                <div
                  className="col-xxl-4 col-md-6 cursor"
                  onClick={() => navigate("/user/working/devices/present")}
                >
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Qurilmalar <span>| Bugungi</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                          <img
                            src="../../src/assets/images/iot.png"
                            alt="device"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{dataDevicesStatistics.presentDay} ta</h6>
                          <span className="text-success small pt-1 fw-bold">
                            ishlagan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-xxl-4 col-md-6 cursor"
                  onClick={() => navigate("/user/working/devices/three")}
                >
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Qurilmalar <span>| Uch kunlik</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                          <img
                            src="../../src/assets/images/iot.png"
                            alt="device"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{dataDevicesStatistics.dataThreeDay} ta</h6>
                          <span className="text-success small pt-1 fw-bold">
                            ishlagan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-xxl-4 col-md-6 cursor"
                  onClick={() => navigate("/user/working/devices/ten")}
                >
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Qurilmalar <span>| O'n kunlik</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                          <img
                            src="../../src/assets/images/iot.png"
                            alt="device"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{dataDevicesStatistics.dataTenDay} ta</h6>
                          <span className="text-success small pt-1 fw-bold">
                            ishlagan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-xxl-4 col-md-6 cursor"
                  onClick={() => navigate("/user/working/devices/month")}
                >
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Qurilmalar <span>| Bir oylik</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                          <img
                            src="../../src/assets/images/iot.png"
                            alt="device"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{dataDevicesStatistics.dataMonthDay} ta</h6>
                          <span className="text-success small pt-1 fw-bold">
                            ishlagan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-xxl-4 col-md-6 cursor"
                  onClick={() => navigate("/user/working/devices/year")}
                >
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Qurilmalar <span>| Bir yillik</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                          <img
                            src="../../src/assets/images/iot.png"
                            alt="device"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{dataDevicesStatistics.dataYear} ta</h6>
                          <span className="text-success small pt-1 fw-bold">
                            devices
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Statistic;
