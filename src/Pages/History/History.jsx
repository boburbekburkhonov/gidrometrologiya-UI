import React, { useEffect, useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  function filterDate(e) {
    e.preventDefault();

    const { startDate, endDate } = e.target;

    if (startDate.value.length > 0 && endDate.value.length > 0) {
      fetch("http://localhost:3000/mqtt/filter/data", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          start: startDate.value,
          end: endDate.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setData(data);
          }
        });
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/mqtt/data", {
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
          setLoader(false);
        }
      });
  }, []);

  return (
    <>
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
              ) : data.length == 0 && !loader ? (
                <div className="alert alert-info fs-4 fw-semibold" role="alert">
                  Hozircha qurilmadan ma'lumot kelmadi!
                </div>
              ) : (
                <>
                  <h2 className="statis-heading">Ma'lumotlar tarixi</h2>
                  <div>
                    <form
                      className="d-flex justify-content-center date-wrapper"
                      onSubmit={filterDate}
                    >
                      <div className="d-flex flex-column date-filter me-3 date-filter-responsive">
                        <label className="date-content" htmlFor="start-date">
                          Boshlanish sanasi
                        </label>
                        <input
                          className="form-control date-input"
                          name="startDate"
                          type="date"
                          id="start-date"
                        />
                      </div>

                      <div className="d-flex flex-column date-filter">
                        <label className="date-content" htmlFor="start-date">
                          Tugash sanasi
                        </label>
                        <input
                          className="form-control date-input"
                          name="endDate"
                          type="date"
                          id="start-date"
                        />
                      </div>

                      <div className="d-flex flex-column-reverse ms-3 filter-btn-wrapper">
                        <button className="btn btn-info date-filter-btn">
                          Qidirish
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="table-scrol m-auto">
                    <table className="c-table mt-4 table-scroll">
                      <thead className="c-table__header">
                        <tr>
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
                        {data.length > 0 &&
                          data.map((element, index) => {
                            const time = new Date(element.time);
                            time.setHours(time.getHours() - 5);
                            return (
                              <tr className="fs-6" key={index}>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.windDirection}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.rainHeight}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.windSpeed}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.airHumidity}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.airTemp}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.airPressure}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.soilHumidity}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.soilTemp}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.leafHumidity}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.leafTemp}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.typeSensor}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {element.imei}
                                  </a>
                                </td>
                                <td className="c-table__cell">
                                  <a href="#" className="text-dark">
                                    {moment(time).format("LLLL")}
                                  </a>
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
    </>
  );
};

export default History;
