import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGlobal } from "../Api/ApiGlobal";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import { Helmet } from "react-helmet-async";

const LastDataLocation = () => {
  const [info, setInfo] = useState([]);
  const { imei } = useParams();

  useEffect(() => {
    fetch(`${apiGlobal}/info/${imei}`, {
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

  const defaultState = {
    center: [info.lat, info.lon],
    zoom: 10,
    controls: ["zoomControl", "fullscreenControl"],
  };

  return (
    <>
      <main id="main" className="main">
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
                  <Placemark
                    geometry={[info.lat, info.lon]}
                    properties={{
                      hintContent: info.name,
                      balloonContentHeader:
                        '<img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" height="120" width="180"> <br/> ',
                      balloonContentBody:
                        `<b><span href = "#">Qurilma nomi: ${info.name}</span></b><br>` +
                        `<span class="description">Viloyat: ${info.region}</span><br/>` +
                        `<span class="description">Tuman: ${info.district}</span> <br/>` +
                        `<span>Telefon raqam: <a href="tel:${info.phoneNumber}">${info.phoneNumber}</a></span><br/>` +
                        `<span class="description">Latitude: ${info.lat}</span> <br/>` +
                        `<span class="description">Longitude: ${info.lon}</span> <br/>` +
                        `<b><span class="description">Imei: ${info.imei}</span></b> <br/>` +
                        `<span class="description">Suv ombori identifikatori: ${info.reservoirId}</span> <br/>`,
                    }}
                    modules={[
                      "geoObject.addon.hint",
                      "geoObject.addon.balloon",
                    ]}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref:
                        "../../../src/assets/images/icon-location.png",
                      iconImageSize: [32, 32],
                    }}
                  />

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
    </>
  );
};

export default LastDataLocation;
