import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import { useParams } from "react-router-dom";
import moment from "moment";

const Lastdata = () => {
  const [lastdata, setLastData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { term } = useParams();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/lastdata/${term}`, {
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
                <h2>Oxirgi ma'lumotlar</h2>
                <div className="table-scrol m-auto">
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
                      {lastdata.length > 0 &&
                        lastdata.map((element, index) => {
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
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <Helmet>
        <script src="/src/assets/js/table.js"></script>
      </Helmet>
    </main>
  );
};

export default Lastdata;
