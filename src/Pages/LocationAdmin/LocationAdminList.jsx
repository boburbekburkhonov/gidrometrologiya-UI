import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from "react";

const LocationAdminList = () => {
  const [info, setInfo] = useState([]);

  const defaultState = {
    center: [41.311151, 69.279737],
    zoom: 10,
    controls: ["zoomControl", "fullscreenControl"],
  };

  useEffect(() => {
    fetch(`http://localhost:3000/info/list`, {
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

  return (
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
                {info &&
                  info.map((element, index) => {
                    return (
                      <Placemark
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
                            `<span class="description">Suv ombori identifikatori: ${element.reservoirId}</span> <br/>`,
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
    </main>
  );
};

export default LocationAdminList;
