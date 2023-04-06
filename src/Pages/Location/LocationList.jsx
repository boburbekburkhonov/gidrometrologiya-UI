import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const LocationList = () => {
  const [info, setInfo] = useState([]);

  const defaultState = {
    center: [41.311151, 69.279737],
    zoom: 10,
    controls: ["zoomControl", "fullscreenControl"],
  };

  useEffect(() => {
    fetch(`http://localhost:3000/info/user`, {
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
                      />
                    );
                  })}
              </Map>
            </YMaps>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LocationList;
