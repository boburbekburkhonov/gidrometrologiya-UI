import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGlobal } from "../Api/ApiGlobal";
import * as XLSX from "xlsx";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import "moment/dist/locale/uz-latn";

moment.locale("uz-latn");

const PresentDataWithLastDataImeiAdmin = () => {
  const [data, setData] = useState();
  const { imei } = useParams();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/admin/data/imei/${imei}`, {
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
  }, []);

  const exportDataToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

    XLSX.writeFile(workBook, "History.xlsx");
  };

  const time = new Date();

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
            <div className="d-flex align-items-center">
              {data?.length != 0 ? (
                <div className="d-flex align-items-center">
                  <img
                    src="../../../src/assets/images/location-black.png"
                    alt="location"
                    width="28"
                    height="28"
                  />
                  <h3 className="present-data-with-lastdata">
                    {data?.length > 0 ? data[0].name : null}
                  </h3>
                </div>
              ) : null}
              <div className="d-flex align-items-center m-auto">
                <h3 className="mb-0 present-day-data-heading">
                  Bugungi ma'lumotlar{" "}
                </h3>
                <p className="present-day-data-desc">
                  {moment(time).format("LLLL").split(" ")[0] +
                    " " +
                    moment(time).format("LLLL").split(" ")[1] +
                    " " +
                    moment(time).format("LLLL").split(" ")[2] +
                    " " +
                    moment(time).format("LLLL").split(" ")[3]}
                </p>
              </div>
              <div className="ms-auto">
                <button
                  className="custom-btn btn-1 ms-auto"
                  onClick={data?.length != 0 ? exportDataToExcel : null}
                >
                  Ma'lumotlarni saqlash
                </button>
              </div>
            </div>
            {data?.length == 0 ? (
              <div className="alert alert-primary mt-4 fs-4 text-center fw-bold">
                Bugun ma'lumot kelmadi ...
              </div>
            ) : (
              <div className="table-scrol m-auto">
                <table className="c-table mt-4 table-scroll">
                  <thead className="c-table__header">
                    <tr>
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
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {data?.length > 0 &&
                      data.map((element, index) => {
                        const time = new Date(element.time);
                        time.setHours(time.getHours() - 5);
                        return (
                          <tr className="fs-6" key={index}>
                            <td className="c-table__cell text-center">
                              {String(element.time).slice(11, 19)}
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
              </div>
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

export default PresentDataWithLastDataImeiAdmin;
