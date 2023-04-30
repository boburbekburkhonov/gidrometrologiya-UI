import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import * as XLSX from "xlsx";

const HistoryAdmin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dataName, setDataName] = useState([]);
  const [dataNameSearch, setDataNameSearch] = useState([]);
  const [yesterday, setYesterday] = useState(false);
  const [present, setPresent] = useState(true);
  const [month, setMonth] = useState(false);

  function filterDate(e) {
    e.preventDefault();

    const { startDate, endDate, deviceName } = e.target;

    if (startDate.value.length > 0 && endDate.value.length > 0) {
      fetch(`${apiGlobal}/mqtt/admin/filter/data`, {
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
    fetch(`${apiGlobal}/mqtt/admin/data/device/name/present`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataNameSearch(data);
        }
      });

    fetch(`${apiGlobal}/mqtt/admin/data/device/name`, {
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
        }
      });

    fetch(`${apiGlobal}/mqtt/admin/data/present`, {
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
            mySet.add(e.name);
          });
          setData(data.filter((e) => e.name == data[0].name));
          setLoader(false);
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
    setDataNameSearch([]);

    fetch(`${apiGlobal}/mqtt/admin/yesterday/data`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const devicesName = new Set();
          data.filter((e) => {
            devicesName.add(e.name);
          });
          setYesterday(true);
          setPresent(false);
          setMonth(false);
          setDataNameSearch([...devicesName]);
          setData(data.filter((e) => e.name == [...devicesName][0]));
        }
      });
  };

  const presentData = () => {
    setDataNameSearch([]);

    fetch(`${apiGlobal}/mqtt/admin/data/present`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const devicesName = new Set();
          data.filter((e) => {
            devicesName.add(e.name);
          });
          setYesterday(false);
          setPresent(true);
          setMonth(false);
          setDataNameSearch([...devicesName]);
          setData(data.filter((e) => e.name == [...devicesName][0]));
        }
      });
  };

  const monthData = () => {
    setDataNameSearch([]);

    fetch(`${apiGlobal}/mqtt/admin/yesterday/data/statistics`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const devicesName = new Set();
          data.filter((e) => {
            devicesName.add(e.name);
          });
          setYesterday(false);
          setPresent(false);
          setMonth(true);
          setDataNameSearch([...devicesName]);
          setData(data.filter((e) => e.name == [...devicesName][0]));
        }
      });
  };

  const foundDataWithName = (e) => {
    e.preventDefault();

    const deviceName = e.target.value;

    if (yesterday) {
      fetch(`${apiGlobal}/mqtt/admin/yesterday/data/found/name`, {
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
      fetch(`${apiGlobal}/mqtt/admin/data/present/name`, {
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
      fetch(`${apiGlobal}/mqtt/admin/yesterday/data/statistics/found/name`, {
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
                    {data.every(
                      (e) =>
                        new Date(e.time).getFullYear() == time.getFullYear() &&
                        new Date(e.time).getMonth() == time.getMonth() &&
                        new Date(e.time).getDate() == time.getDate()
                    ) ? (
                      <div className="d-flex align-items-center flex-wrap">
                        <h3 className="mb-0 present-day-data-heading">
                          Bugungi ma'lumotlar
                        </h3>
                        <p className="present-day-data-desc">
                          {moment(time).format("L") +
                            " " +
                            String(time).slice(15, 24)}
                        </p>
                      </div>
                    ) : null}

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
                        id="select-search-data"
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
                      className="custom-btn btn-1 custom-btn-first"
                      onClick={yesterdayData}
                    >
                      Kecha kelgan ma'lumotlar
                    </button>

                    <button className="custom-btn btn-1" onClick={presentData}>
                      Bugun kelgan ma'lumotlar
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
                    <table className="c-table mt-4 table-scroll">
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

export default HistoryAdmin;
