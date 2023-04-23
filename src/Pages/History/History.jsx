import React, { useEffect, useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import * as XLSX from "xlsx";

const History = () => {
  const [data, setData] = useState([]);
  const [dataStatistic, setDataStatistic] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dataName, setDataName] = useState([]);
  const [yesterday, setYesterday] = useState(true);

  function filterDate(e) {
    e.preventDefault();

    const { startDate, endDate, deviceName } = e.target;

    if (startDate.value.length > 0 && endDate.value.length > 0) {
      fetch("http://95.130.227.80:3000/mqtt/filter/data", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          deviceName: deviceName.value,
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
    fetch(`${apiGlobal}/mqtt/data/present`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const mySet = new Set();
          data.filter((e) => {
            mySet.add(e.typeSensor);
          });
          setData(data);
          setDataName([...mySet]);
          setLoader(false);
        }
      });

    fetch(`${apiGlobal}/mqtt/yesterday/data/statistics`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataStatistic(data);
        }
      });
  }, []);

  const exportDataToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

    XLSX.writeFile(workBook, "History.xlsx");
  };

  const yesterdayData = () => {
    fetch(`${apiGlobal}/mqtt/yesterday/data`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setYesterday(false);
          setData(data);
        }
      });
  };

  const yesterdayDataStatistic = (time) => {
    fetch(`${apiGlobal}/mqtt/yesterday/data/statistics/devices/${time}`, {
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
  };

  const time = new Date();
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
              ) : (
                <>
                  <h2 className="statis-heading">Ma'lumotlar tarixi</h2>
                  <div className="d-flex flex-wrap">
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

                      <div className="d-flex flex-column date-filter filter-select">
                        <label className="date-content" htmlFor="start-date">
                          Qurilma nomi
                        </label>
                        <select className="form-select" name="deviceName">
                          <option value="All">All</option>
                          {dataName.map((e, index) => {
                            return (
                              <option value={e} key={index}>
                                {e}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="d-flex flex-column-reverse ms-3 filter-btn-wrapper">
                        <button className="btn btn-info date-filter-btn">
                          Qidirish
                        </button>
                      </div>
                    </form>

                    <div className="ms-auto history-btn-wrapper">
                      <button
                        className="custom-btn btn-1 ms-3"
                        onClick={yesterdayData}
                      >
                        Kecha kelgan ma'lumotlar
                      </button>

                      <button
                        className="btn btn-info btn-save-data"
                        onClick={data.length != 0 ? exportDataToExcel : null}
                      >
                        Ma'lumotlarni saqlash
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 deveices-statistics-wrapper">
                    <ul className="list-unstyled m-0 p-0 d-flex align-items-center">
                      {dataStatistic.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="data-statistic-item"
                            onClick={() => yesterdayDataStatistic(item.time)}
                          >
                            {moment(item.time).format("L")}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="table-scrol m-auto">
                    {yesterday &&
                    data.every(
                      (e) => new Date(e.time).getDate() == time.getDate()
                    ) ? (
                      <div className="d-flex align-items-center mt-3">
                        <h3 className="fs-4 mb-0 present-day-data-heading">
                          Bugungi ma'lumotlar
                        </h3>
                        <p className="present-day-data-desc">
                          {moment(time).format("L") +
                            " " +
                            moment(time).format("LTS")}
                        </p>
                      </div>
                    ) : null}
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
                                <td className="c-table__cell">
                                  {element.name}
                                </td>
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
                                <td className="c-table__cell">
                                  {element.imei}
                                </td>
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
    </>
  );
};

export default History;
