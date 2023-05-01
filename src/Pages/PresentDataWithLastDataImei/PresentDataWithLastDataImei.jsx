import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGlobal } from "../Api/ApiGlobal";
import moment from "moment";

const PresentDataWithLastDataImei = () => {
  const [data, setData] = useState();
  const { imei } = useParams();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/data/imei/${imei}`, {
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

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
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
                          {moment(time).format("L")}
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
        </section>
      </div>
    </main>
  );
};

export default PresentDataWithLastDataImei;
