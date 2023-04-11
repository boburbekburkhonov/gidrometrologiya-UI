import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharInformation from "../CharInformation/CharInformation";
import moment from "moment";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Statistic = () => {
  const [dataDevicesStatistics, setDataDevicesStatistics] = useState([]);
  const [dataInformation, setDataInformation] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/mqtt/data/statistics/devices", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setDataDevicesStatistics(data));

    fetch("http://localhost:3000/mqtt/data/statistics", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setDataInformation(data));

    fetch("http://localhost:3000/mqtt/lastdata", {
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

  const items = [
    lastData.map((element, index) => {
      const time = new Date(element.time);
      time.setHours(time.getHours() - 5);
      return (
        <div className="col-md-4 col-md-4-spinner col-xl-3 w-100" key={index}>
          <div className="card bg-c-blue order-card">
            <div className="card-block">
              <h2 className="m-b-20 fs-5 heading-lastdata time-lastdata">
                Name: {element.name}
              </h2>

              <h2 className="text-right">
                <span className="fs-5 time-lastdata">
                  TypeSensor: {element.typeSensor}
                </span>
              </h2>

              <h2 className="text-right">
                <span className="fs-5 time-lastdata">
                  Date:{" "}
                  {new Date().getDate() == new Date(element.time).getDate()
                    ? moment(time).format("LTS")
                    : time.toLocaleString()}
                </span>
              </h2>

              <div className="d-flex justify-content-end">
                <button
                  className="lastdata-learn-more"
                  onClick={() => navigate(`/user/mqtt/${element.imei}`)}
                >
                  Batafsil
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }),
  ];

  return (
    <main id="main" className="main">
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
                      autoPlay={true}
                      infinite={true}
                      autoPlayStrategy="all"
                      animationDuration="2000"
                      mouseTracking
                      items={items}
                    />
                  )
                )}

                <CharInformation data={dataInformation} />

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
