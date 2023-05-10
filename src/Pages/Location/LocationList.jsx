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
        <div className="modal-dialog table-location-width modal-dialog-centered">
          <div className="modal-content table-location-scrol">
            <div className="modal-header lastdata-close  pb-0">
              <button
                type="button"
                className="btn-close btn-close-location"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
              <div className="m-auto">
                {data.length == 0 ? (
                  <div className="alert alert-info fw-bold mt-4 text-center">
                    Hozircha ma'lumot kelmadi...
                  </div>
                ) : (
                  <table className="c-table mt-4 table-scroll">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Vaqt</th>
                        <th className="c-table__col-label text-center">
                          Shamol yo'nalishi
                        </th>
                        <th className="c-table__col-label text-center">
                          Shamol tezligi
                        </th>
                        <th className="c-table__col-label text-center">
                          Tuproq temperaturasi
                        </th>
                        <th className="c-table__col-label text-center">
                          Tuproq namligi
                        </th>
                        <th className="c-table__col-label text-center">
                          Havo temperaturasi
                        </th>
                        <th className="c-table__col-label text-center">
                          Havo namligi
                        </th>
                        <th className="c-table__col-label text-center">
                          Havo bosimi
                        </th>
                        <th className="c-table__col-label text-center">
                          Barg temperaturasi
                        </th>
                        <th className="c-table__col-label text-center">
                          Barg namligi
                        </th>
                        <th className="c-table__col-label text-center">
                          Yomg'ir qalingligi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {data.length > 0 &&
                        data.map((element, index) => {
                          const time = new Date(element.time);
                          time.setHours(time.getHours() - 5);
                          return (
                            <tr className="fs-6" key={index}>
                              <td className="c-table__cell text-center">
                                {String(element.time).slice(11, 19)}
                              </td>
                              <td className="c-table__cell text-center">
                                {element.windDirection}
                              </td>
                              <td className="c-table__cell text-center">
                                {element.windSpeed} m/s
                              </td>
                              <td className="c-table__cell text-center">
                                {element.soilTemp}°C
                              </td>
                              <td className="c-table__cell text-center">
                                {element.soilHumidity} %
                              </td>
                              <td className="c-table__cell text-center">
                                {element.airTemp}°C
                              </td>
                              <td className="c-table__cell text-center">
                                {element.airHumidity}%
                              </td>
                              <td className="c-table__cell text-center">
                                {element.airPressure} kPa
                              </td>
                              <td className="c-table__cell text-center">
                                {element.leafTemp}°C
                              </td>
                              <td className="c-table__cell text-center">
                                {element.leafHumidity}%
                              </td>
                              <td className="c-table__cell text-center">
                                {element.rainHeight} mm
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
                          iconLayout: "default#image",
                          iconImageHref:
                            "../../src/assets/images/icon-location.png",
                          iconImageSize: [32, 32],
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
        <script src="/src/assets/js/table.js"></script>
      </Helmet>
    </main>
  );
};

export default LocationList;
