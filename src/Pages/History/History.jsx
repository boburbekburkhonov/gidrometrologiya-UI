import React, { useEffect, useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import * as XLSX from "xlsx";
import "moment/dist/locale/uz-latn";

moment.locale("uz-latn");

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dataName, setDataName] = useState([]);
  const [dataNameSearch, setDataNameSearch] = useState([]);
  const [yesterday, setYesterday] = useState(false);
  const [present, setPresent] = useState(true);
  const [month, setMonth] = useState(false);
  const [filter, setFilter] = useState(false);
  const [checkDataName, setCheckDataName] = useState(false);


  function filterDate(e) {
    e.preventDefault();

    const { startDate, endDate, deviceName } = e.target;

    if (startDate.value.length > 0 && endDate.value.length > 0) {
      fetch(`${apiGlobal}/mqtt/filter/data`, {
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
            setPresent(false)
            setYesterday(false)
            setMonth(false)
            setFilter(true)
            setData(data);
          }
        });
    }
  }

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/data/device/name`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataName(data);
          setDataNameSearch(data);
          setCheckDataName(true)
        }
      });
  }, []);

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
          setData(data.filter((e) => e.name == dataNameSearch[0]));
          setLoader(false);
        }
      });
  }, [checkDataName])

  const exportDataToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

    XLSX.writeFile(workBook, "History.xlsx");
  };

  const yesterdayData = () => {
    setDataNameSearch([]);

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
          setYesterday(true);
          setFilter(false)
          setPresent(false);
          setMonth(false);
          setDataNameSearch(dataName);
          setData(data.filter((e) => e.name == dataNameSearch[0]));
        }
      });
  };

  const presentData = () => {
    setDataNameSearch([]);
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
          setFilter(false)
          setYesterday(false);
          setPresent(true);
          setMonth(false);
          setDataNameSearch(dataName);
          setData(data.filter((e) => e.name == dataNameSearch[0]));
        }
      });
  };

  const monthData = () => {
    setDataNameSearch([]);
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
          setYesterday(false);
          setPresent(false);
          setFilter(false)
          setMonth(true);
          setDataNameSearch(dataName);
          setData(data.filter((e) => e.name == dataNameSearch[0]));
        }
      });
  };

  const foundDataWithName = (e) => {
    e.preventDefault();

    const deviceName = e.target.value;

    if (yesterday) {
      fetch(`${apiGlobal}/mqtt/yesterday/data/found/name`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: deviceName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setData(data);
          }
        });
    } else if (present) {
      fetch(`${apiGlobal}/mqtt/data/present/name`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: deviceName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setData(data);
          }
        });
    } else if (month) {
      fetch(`${apiGlobal}/mqtt/yesterday/data/statistics/found/name`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: deviceName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setData(data);
          }
        });
    }
  };

  const time = new Date();
  const timeYesterday = new Date();
  timeYesterday.setDate(timeYesterday.getDate() - 1);
  const timeMonth = new Date();
  timeMonth.setMonth(timeMonth.getMonth() - 1);

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
                  <div className="d-flex flex-wrap mb-3">
                    <div className="d-flex align-items-center flex-wrap">
                      <h3 className="mb-0 present-day-data-heading">
                        {present
                          ? "Bugungi ma'lumotlar"
                          : yesterday
                          ? "Kecha kelgan ma'lumotlar"
                          : month
                          ? "Bir oylik ma'lumotlar"
                          : filter
                          ? "Qidirilgan ma'lumotlar"
                          : null}
                      </h3>
                      <p className="present-day-data-desc">
                        {present
                          ? moment(time).format("LLLL").split(" ")[0] +
                            " " +
                            moment(time).format("LLLL").split(" ")[1] +
                            " " +
                            moment(time).format("LLLL").split(" ")[2] +
                            " " +
                            moment(time).format("LLLL").split(" ")[3]
                          : yesterday
                          ? moment(timeYesterday).format("LLLL").split(" ")[0] +
                            " " +
                            moment(timeYesterday).format("LLLL").split(" ")[1] +
                            " " +
                            moment(timeYesterday).format("LLLL").split(" ")[2] +
                            " " +
                            moment(timeYesterday).format("LLLL").split(" ")[3]
                          : month
                          ? moment(timeMonth).format("LLLL").split(" ")[0] +
                            " " +
                            moment(timeMonth).format("LLLL").split(" ")[1] +
                            " " +
                            moment(timeMonth).format("LLLL").split(" ")[2] +
                            " " +
                            moment(timeMonth).format("LLLL").split(" ")[3]
                          : null}
                      </p>
                    </div>

                    <div className="ms-auto d-flex align-items-center justify-content-center devices-name-present">
                      <label
                        className="device-name-label me-3"
                        htmlFor="start-date"
                      >
                        Qurilma nomi
                      </label>
                      <select
                        className="form-select"
                        name="deviceNameSearch"
                        onChange={foundDataWithName}
                      >
                        {dataNameSearch.map((e, index) => {
                          return (
                            <option value={e} key={index}>
                              {e}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="history-btn-wrapper mb-3">
                    <button
                      className="custom-btn custom-btn-start btn-1"
                      onClick={presentData}
                    >
                      Bugun kelgan ma'lumotlar
                    </button>

                    <button
                      className="custom-btn btn-1 custom-btn-first"
                      onClick={yesterdayData}
                    >
                      Kecha kelgan ma'lumotlar
                    </button>

                    <button className="custom-btn btn-1" onClick={monthData}>
                      Bir oylik ma'lumotlar
                    </button>

                    <button
                      className="custom-btn btn-1"
                      onClick={data.length != 0 ? exportDataToExcel : null}
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>

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
                  </div>

                  <div className="table-scrol m-auto">
                    {data.length == 0 ? (
                      <div className="alert alert-primary mt-4 fs-4 text-center fw-bold">
                        Hozircha ma'lumot kelmadi ...
                      </div>
                    ) : (
                      <table className="c-table mt-4">
                        <thead className="c-table__header">
                          <tr>
                            <th className="c-table__col-label text-center">
                              Vaqt
                            </th>
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
                                    {present
                                      ? String(element.time).slice(11, 19)
                                      : yesterday
                                      ? String(element.time).slice(11, 19)
                                      : month
                                      ? moment(time).format("L")
                                      : filter
                                      ? moment(time).format("L") +
                                        " " +
                                        String(element.time).slice(11, 19)
                                      : null}
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
                                  <td className="c-table__cell text-center">
                                    {element.typeSensor}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    )}
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
