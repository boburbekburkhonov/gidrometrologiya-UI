import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Statistic = () => {
  const [dataDevicesStatistics, setDataDevicesStatistics] = useState([]);
  const [dataInformation, setDataInformation] = useState([]);
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState([]);
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

    fetch("http://localhost:3000/mqtt/data", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));

    fetch("http://localhost:3000/mqtt/lastdata", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setLastData(data));
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
            <h2 className="statis-heading">Devices that worked</h2>
            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/working/devices/present")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Devices <span>| Today</span>
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
                      <h6>{dataDevicesStatistics.presentDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
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
                    Devices <span>| Three Day</span>
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
                      <h6>{dataDevicesStatistics.dataThreeDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
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
                    Devices <span>| Ten Day</span>
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
                      <h6>{dataDevicesStatistics.dataTenDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
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
                    Devices <span>| Month</span>
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
                      <h6>{dataDevicesStatistics.dataMonthDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
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
                    Devices <span>| Year</span>
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
                      <h6>{dataDevicesStatistics.dataYear}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="statis-heading">
              Received information from devices
            </h2>
            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/information/devices/present")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Information <span>| Today</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/info.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{dataInformation.presentDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/information/devices/three")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Information <span>| Three Day</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/info.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{dataInformation.dataThreeDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/information/devices/ten")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Information <span>| Ten Day</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/info.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{dataInformation.dataTenDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/information/devices/month")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Information <span>| Month</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/info.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{dataInformation.dataMonthDay}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xxl-4 col-md-6 cursor"
              onClick={() => navigate("/user/information/devices/year")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Information <span>| Year</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/info.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{dataInformation.dataYear}</h6>
                      <span className="text-success small pt-1 fw-bold">
                        devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="statis-heading">Data & LastData</h2>
            <div
              className="col-xxl-4 col-md-6 cursor col-xxl-4-data"
              onClick={() => navigate("/user/mqtt/data")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    Data <span>| All</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/data.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{data.length}</h6>
                      <span className="text-success small pt-1 fw-bold color-data-lastdata">
                        all information from data
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xxl-4 col-md-6 cursor col-xxl-4-data"
              onClick={() => navigate("/user/mqtt/lastdata")}
            >
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">
                    LastData <span>| All</span>
                  </h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon ms-5 rounded-circle d-flex align-items-center justify-content-center">
                      <img
                        src="../../src/assets/images/data.png"
                        alt="device"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ps-3">
                      <h6>{lastData.length}</h6>
                      <span className="text-success small pt-1 fw-bold color-data-lastdata">
                        all information from last data
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Statistic;
