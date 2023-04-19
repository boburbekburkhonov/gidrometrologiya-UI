import React, { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import moment from "moment";

const LocationList = () => {
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);

  const defaultState = {
    center: [41.311151, 69.279737],
    zoom: 10,
    controls: ["zoomControl", "fullscreenControl"],
  };

  useEffect(() => {
    fetch(`${apiGlobal}/info/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setInfo(data);
        }
      });
  }, []);

  function getDataImei(imei) {
    fetch(`${apiGlobal}/mqtt/data/imei/${imei}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData(data);
        }
      });
  }

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
        <div className="modal-dialog table-location-width">
          <div className="modal-content table-location-scrol">
            <div className="modal-body">
              <div className="m-auto">
                {data.length == 0 ? (
                  <div className="alert alert-info fw-bold">
                    Hozircha ma'lumot kelmadi
                  </div>
                ) : (
                  <table className="c-table mt-4 table-scroll">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label">Qurilma nomi</th>
                        <th className="c-table__col-label">
                          Shamol yo'nalishi
                        </th>
                        <th className="c-table__col-label">Shamol tezligi</th>
                        <th className="c-table__col-label">
                          Tuproq temperaturasi
                        </th>
                        <th className="c-table__col-label">Tuproq namligi</th>
                        <th className="c-table__col-label">
                          Havo temperaturasi
                        </th>
                        <th className="c-table__col-label">Havo namligi</th>
                        <th className="c-table__col-label">Havo bosimi</th>
                        <th className="c-table__col-label">
                          Barg temperaturasi
                        </th>
                        <th className="c-table__col-label">Barg namligi</th>
                        <th className="c-table__col-label">
                          Yomg'ir qalingligi
                        </th>
                        <th className="c-table__col-label">Sensor turi</th>
                        <th className="c-table__col-label">Imei</th>
                        <th className="c-table__col-label">Vaqt</th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {data.length > 0 &&
                        data.map((element, index) => {
                          const time = new Date(element.time);
                          time.setHours(time.getHours() - 5);
                          return (
                            <tr className="fs-6" key={index}>
                              <td className="c-table__cell">{element.name}</td>
                              <td className="c-table__cell">
                                {element.windDirection}°C
                              </td>
                              <td className="c-table__cell">
                                {element.windSpeed} m/s
                              </td>
                              <td className="c-table__cell">
                                {element.soilTemp}°C
                              </td>
                              <td className="c-table__cell">
                                {element.soilHumidity} %
                              </td>
                              <td className="c-table__cell">
                                {element.airTemp}°C
                              </td>
                              <td className="c-table__cell">
                                {element.airHumidity}%
                              </td>
                              <td className="c-table__cell">
                                {element.airPressure} kPa
                              </td>
                              <td className="c-table__cell">
                                {element.leafTemp}°C
                              </td>
                              <td className="c-table__cell">
                                {element.leafHumidity}%
                              </td>
                              <td className="c-table__cell">
                                {element.rainHeight} mm
                              </td>
                              <td className="c-table__cell">
                                {element.typeSensor}
                              </td>
                              <td className="c-table__cell">{element.imei}</td>
                              <td className="c-table__cell">
                                {new Date().getDate() ==
                                new Date(element.time).getDate()
                                  ? moment(time).format("LTS")
                                  : moment(time).format("L") +
                                    " " +
                                    moment().format("LTS")}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
            <YMaps>
              <Map
                defaultState={defaultState}
                modules={["control.ZoomControl", "control.FullscreenControl"]}
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {info &&
                  info.map((element, index) => {
                    return (
                      <Placemark
                        onClick={() => getDataImei(element.imei)}
                        geometry={[element.lat, element.lon]}
                        key={index}
                        properties={{
                          hintContent: element.name,
                          balloonContentHeader:
                            '<img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" height="120" width="180"> <br/> ',
                          balloonContentBody:
                            `<b><span href = "#">Qurilma nomi: ${element.name}</span></b><br>` +
                            `<span class="description">Viloyat: ${element.region}</span><br/>` +
                            `<span class="description">Tuman: ${element.district}</span> <br/>` +
                            `<span>Telefon raqam: <a href="tel:${element.phoneNumber}">${element.phoneNumber}</a></span><br/>` +
                            `<span class="description">Latitude: ${element.lat}</span> <br/>` +
                            `<span class="description">Longitude: ${element.lon}</span> <br/>` +
                            `<b><span class="description">Imei: ${element.imei}</span></b> <br/>` +
                            `<span class="description">Suv ombori identifikatori: ${element.reservoirId}</span> <br/>` +
                            `<div class='button-location-wrapper'>
                              <button class='button-location' data-bs-toggle="modal"
                              data-bs-target="#exampleModal">Ma'lumotlar</button>
                            </div>`,
                        }}
                        modules={[
                          "geoObject.addon.hint",
                          "geoObject.addon.balloon",
                        ]}
                        options={{
                          preset: "islands#redDotIcon",
                        }}
                      />
                    );
                  })}
                <GeolocationControl options={{ float: "left" }} />
                <TypeSelector options={{ float: "right" }} />
              </Map>
            </YMaps>
          </div>
        </section>
      </div>
      <Helmet>
        <script src="http://localhost:5173/src/assets/js/table.js"></script>
      </Helmet>
    </main>
  );
};

export default LocationList;
