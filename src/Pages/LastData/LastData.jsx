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
                        <th className="c-table__col-label text-center">
                          Qurilma nomi
                        </th>
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
                        <th className="c-table__col-label text-center">
                          Sensor turi
                        </th>
                        <th className="c-table__col-label text-center">Imei</th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {lastdata.length > 0 &&
                        lastdata.map((element, index) => {
                          const time = new Date(element.time);
                          time.setHours(time.getHours() - 5);
                          return (
                            <tr className="fs-6" key={index}>
                              <td className="c-table__cell text-center">
                                {element.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {new Date().getDate() ==
                                new Date(element.time).getDate()
                                  ? String(element.time).slice(11, 19)
                                  : moment(time).format("L") +
                                    " " +
                                    String(element.time).slice(11, 19)}
                              </td>
                              <td className="c-table__cell text-center">
                                {element.windDirection}°C
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
                              <td className="c-table__cell text-center">
                                {element.typeSensor}
                              </td>
                              <td className="c-table__cell text-center">
                                {element.imei}
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
