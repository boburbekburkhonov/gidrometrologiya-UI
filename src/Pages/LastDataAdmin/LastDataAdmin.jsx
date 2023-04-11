import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const LastDataAdmin = () => {
  const [lastdata, setLastData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { term } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/mqtt/admin/lastdata/${term}`, {
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
                <h2>{term == "data" ? "Data" : "Last Data"}</h2>
                <div className="table-scrol m-auto">
                  <table className="c-table mt-4 table-scroll">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label">Name</th>
                        <th className="c-table__col-label">WindDirection</th>
                        <th className="c-table__col-label">RainHeight</th>
                        <th className="c-table__col-label">WindSpeed</th>
                        <th className="c-table__col-label">AirHumidity</th>
                        <th className="c-table__col-label">AirTemp</th>
                        <th className="c-table__col-label">AirPressure</th>
                        <th className="c-table__col-label">SoilHumidity</th>
                        <th className="c-table__col-label">SoilTemp</th>
                        <th className="c-table__col-label">LeafHumidity</th>
                        <th className="c-table__col-label">LeafTemp</th>
                        <th className="c-table__col-label">TypeSensor</th>
                        <th className="c-table__col-label">Imei</th>
                        <th className="c-table__col-label">Time</th>
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
                                {element.windDirection}
                              </td>
                              <td className="c-table__cell">
                                {element.rainHeight}
                              </td>
                              <td className="c-table__cell">
                                {element.windSpeed}
                              </td>
                              <td className="c-table__cell">
                                {element.airHumidity}
                              </td>
                              <td className="c-table__cell">
                                {element.airTemp}
                              </td>
                              <td className="c-table__cell">
                                {element.airPressure}
                              </td>
                              <td className="c-table__cell">
                                {element.soilHumidity}
                              </td>
                              <td className="c-table__cell">
                                {element.soilTemp}
                              </td>
                              <td className="c-table__cell">
                                {element.leafHumidity}
                              </td>
                              <td className="c-table__cell">
                                {element.leafTemp}
                              </td>
                              <td className="c-table__cell">
                                {element.typeSensor}
                              </td>
                              <td className="c-table__cell">{element.imei}</td>
                              <td className="c-table__cell">
                                {new Date().getDate() ==
                                new Date(element.time).getDate()
                                  ? moment(time).format("LTS")
                                  : moment(time).format("LLLL")}
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
        <script src="http://localhost:5173/src/assets/js/table.js"></script>
      </Helmet>
    </main>
  );
};

export default LastDataAdmin;
