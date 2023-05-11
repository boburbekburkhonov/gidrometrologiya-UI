import React, { useEffect, useState } from "react";
import { apiGlobal } from "../Api/ApiGlobal";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import moment from "moment";
import d2d from "degrees-to-direction";
import CharStatistic from "../CharStatistic/CharStatistic";
import CharStatisticMonth from "../CharStatisticMonth/CharStatisticMonth";

const StatisticAdmin = () => {
  const [dataDevicesStatistics, setDataDevicesStatistics] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [oneLastData, setOneLastData] = useState([]);
  const [mainWeather, setMainWeather] = useState();
  const [weather, setWeather] = useState({});
  const [dataName, setDataName] = useState([]);
  const [searchStatisChar, setSearchStatisChar] = useState();
  const [searchStatisCharMonth, setSearchStatisCharMonth] = useState();
  const [selectDeviceName, setSelectDeviceName] = useState();
  const [selectDeviceValue, setSelectDeviceValue] = useState("windSpeed");
  const [checkDataName, setCheckDataName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/admin/data/statistics/devices`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setDataDevicesStatistics(data));

    fetch(`${apiGlobal}/mqtt/admin/data/device/name`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataName(data);
          setSelectDeviceName(data[0]);
          setCheckDataName(true);
        }
      });

    fetch(`${apiGlobal}/mqtt/admin/lastdata`, {
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

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/admin/data/present/name/value`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: selectDeviceName,
        value: selectDeviceValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSearchStatisChar(data);
        }
      });

    fetch(`${apiGlobal}/mqtt/admin/data/month/name/value`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: selectDeviceName,
        value: selectDeviceValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSearchStatisCharMonth(data);
        }
      });
  }, [checkDataName, selectDeviceName, selectDeviceValue]);

  const presentDate = new Date();

  const checkingData = (time) => {
    if (
      new Date(time).getFullYear() == presentDate.getFullYear() &&
      new Date(time).getMonth() == presentDate.getMonth()
    ) {
      return presentDate.getDate() - new Date(time).getDate();
    } else if (
      (new Date(time).getFullYear() == presentDate.getFullYear() &&
        presentDate.getMonth() - new Date(time).getMonth() == 1 &&
        presentDate.getDate() == 2 &&
        30 <= new Date(time).getDate() &&
        new Date(time).getDate() <= 31) ||
      (presentDate.getDate() == 1 &&
        29 <= new Date(time).getDate() &&
        new Date(time).getDate() <= 31)
    ) {
      return 1;
    }
  };

  const getLastData = (imei) => {
    fetch(`${apiGlobal}/mqtt/admin/lastdata/${imei}`, {
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

  const getWeatherByName = (nameCity) => {
    const getCountries = async () => {
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&appid=277e160f5af509c9f6e384d7cbe3501c`
      );

      const data = await request.json();
      setMainWeather(data.weather[0].main);
      setWeather(data);
    };
    getCountries();
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
                  src="../../src/assets/images/location-black.png"
                  alt="location"
                  width="28"
                  height="28"
                  className="me-auto"
                  onClick={() => navigate(`lastdata/location/${element.imei}`)}
                />
                <h2
                  className="m-b-20 fs-5 heading-lastdata time-lastdata"
                  onClick={() => getLastData(element.imei)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
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
                onClick={() => getLastData(element.imei)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              ></span>

              <div
                className="d-flex align-items-end justify-content-between"
                onClick={() => getLastData(element.imei)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div>
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
                      {new Date().getDate() ==
                        new Date(element.time).getDate() &&
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

                <img
                  onClick={() => getWeatherByName(element.name)}
                  src="../../../src/assets/images/weather.png"
                  alt="weather"
                  width="35"
                  height="35"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }),
  ];

  const time = new Date();

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
        <div className="modal-dialog modal-one-lastdata modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header lastdata-close">
              <button
                type="button"
                className="btn-close btn-close-location"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
              <div className="m-auto">
                {oneLastData.map((item, index) => {
                  return (
                    <div className="one-lastdata-all-wrapper" key={index}>
                      <div className="d-flex align-items-center">
                        <img
                          src="../../../src/assets/images/location-black.png"
                          alt="location"
                          width="25"
                          height="25"
                        />
                        <h3 className="one-lastdata-heading">{item.name}</h3>
                      </div>
                      <div className="one-lastdata-href"></div>
                      <div className="one-lastdata-wrapper">
                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/wind-speed.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Shamol tezligi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.windSpeed}m/s
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/wind-gust.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Shamol yo'nalishi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.windDirection}
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/soil-temperature.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Tuproq temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.soilTemp}°C
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/soil-humidity.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Tuproq namligi:{" "}
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.soilHumidity} %
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/air-temperature.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Havo temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.airTemp}°C
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/air-humidity.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">Havo namligi:</p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.airHumidity}%
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/air-pressure.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">Havo bosimi:</p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.airPressure} kPa
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/leaf-temperature.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Barg temperaturasi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.leafTemp}°C
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/leaf-humidity.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">Barg namligi:</p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.leafHumidity}%
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/rain-height.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">
                            Yomg'ir qalingligi:
                          </p>
                          <p className="m-0 onelast-data-desc fw-bold">
                            {item.rainHeight} mm
                          </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-center onelast-data-wrapper flex-column">
                          <img
                            src="../../../src/assets/images/type-sensor.png"
                            alt="wind-speed"
                            width="36px"
                            height="33px"
                          />
                          <p className="m-0 onelast-data-desc">Sensor turi:</p>
                          <p className="m-0 onelast-data-desc fw-bold">
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

      {/* Modal Weather */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-location-width-weather modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 d-flex align-items-center justify-content-between">
              <h1
                className="admin-weather-header fs-5 m-0"
                id="staticBackdropLabel"
              >
                {weather.name}
              </h1>
              <h3 className="m-0 admin-weather-header text-center">
                {moment(time).format("dddd")}
              </h3>
              <button
                type="button"
                className="btn-close ms-0 btn-close-location"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center admin-weather-item">
                <img
                  className="weather-lastdata-img"
                  src={
                    mainWeather == "Rain"
                      ? "/src/assets/images/rain.png"
                      : mainWeather == "Clear"
                      ? "/src/assets/images/clear-sky.png"
                      : mainWeather == "Clouds"
                      ? "/src/assets/images/clouds.png"
                      : "/src/assets/images/clouds.png"
                  }
                  alt="weather"
                  width="68"
                  height="59"
                />
                <p className="m-0 ms-3 weather-lastdata-desc">
                  {Math.ceil(weather.main?.temp)}°C
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-around mt-4">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src="/src/assets/images/wind-speed.png"
                    alt="weather"
                    width="35"
                    height="29"
                  />
                  <h3 className="weather-lastdata-heading mt-1 mb-1">
                    Shamol tezligi
                  </h3>
                  <p className="weather-lastdata-desc-wind">
                    {Math.ceil(weather.wind?.speed)}km/h{" "}
                    {d2d(weather.wind?.deg)}
                  </p>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src="/src/assets/images/humidity.png"
                    alt="weather"
                    width="35"
                    height="29"
                  />
                  <h3 className="weather-lastdata-heading mt-1 mb-1">Namlik</h3>
                  <p className="weather-lastdata-desc-wind">
                    {weather.main?.humidity}%
                  </p>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src="/src/assets/images/airpressure.png"
                    alt="weather"
                    width="40"
                    height="35"
                  />
                  <h3 className="weather-lastdata-heading mt-1 mb-1">
                    Havo bosimi
                  </h3>
                  <p className="weather-lastdata-desc-wind">
                    {weather.main?.pressure}kPa
                  </p>
                </div>
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
                      autoPlayStrategy="all"
                      animationDuration="2000"
                      disableButtonsControls={true}
                      disableDotsControls={true}
                      mouseTracking
                      items={items}
                    />
                  )
                )}

                <div className="pt-4">
                  <div className="d-flex align-items-center pb-4">
                    <h3 className="present-day-data-heading">
                      Bugun ma'lumotlar
                    </h3>
                    <p className="present-day-data-desc">
                      {moment(time).format("LLLL").split(" ")[0] +
                        " " +
                        moment(time).format("LLLL").split(" ")[1] +
                        " " +
                        moment(time).format("LLLL").split(" ")[2] +
                        " " +
                        moment(time).format("LLLL").split(" ")[3]}
                    </p>
                  </div>

                  <div className="d-flex align-items-center flex-wrap justify-content-center statistic-char-wrapper">
                    <div className="d-flex align-items-center statis-present-device-name me-3">
                      <span className="me-3 statis-present-device-span">
                        Qurilma nomi
                      </span>
                      <select
                        className="form-select statis-char-select"
                        name="statisDeviceName"
                        onChange={(e) => setSelectDeviceName(e.target.value)}
                      >
                        {dataName.map((element, index) => {
                          return (
                            <option value={element} key={index}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="d-flex align-items-center statis-present-device-name me-3 statis-present-device-name-margin">
                      <span className="me-3 statis-present-device-span">
                        Qiymatlari
                      </span>
                      <select
                        className="form-select statis-char-select"
                        name="statisDeviceValues"
                        onChange={(e) => setSelectDeviceValue(e.target.value)}
                      >
                        <option value="windSpeed">Shamol tezligi</option>
                        <option value="windDirection">Shamol yo'nalishi</option>
                        <option value="soilTemp">Tuproq temperaturasi</option>
                        <option value="soilHumidity">Tuproq namligi</option>
                        <option value="airTemp">Havo temperaturasi</option>
                        <option value="airHumidity">Havo namligi</option>
                        <option value="airPressure">Havo bosimi</option>
                        <option value="leafTemp">Barg temperaturasi</option>
                        <option value="leafHumidity">Barg namligi</option>
                        <option value="rainHeight">Yomg'ir qalingligi</option>
                      </select>
                    </div>
                  </div>
                </div>

                <CharStatistic dataStatistic={searchStatisChar} />

                <div className="pt-4">
                  <div className="d-flex align-items-center pb-4">
                    <h3 className="present-day-data-heading">
                      Bir oylik ma'lumotlar
                    </h3>
                    <p className="present-day-data-desc">
                      {moment(time).format("LL").split(" ")[1]}
                    </p>
                  </div>
                </div>

                <CharStatisticMonth dataStatistic={searchStatisCharMonth} />
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default StatisticAdmin;
