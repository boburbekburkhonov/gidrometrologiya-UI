import React, { useEffect, useState } from "react";
import { apiGlobal } from "../Api/ApiGlobal";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const WorkingDevices = () => {
  const [dataDevices, setDataDevices] = useState([]);
  const [loader, setLoader] = useState(true);
  const { term } = useParams();

  useEffect(() => {
    fetch(`${apiGlobal}/mqtt/data/devices/working/${term}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataDevices(data);
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
            ) : dataDevices.length == 0 && !loader ? (
              <div
                className="alert alert-info fs-4 fw-semibold text-center"
                role="alert"
              >
                Hozircha bu qurilmadan ma'lumot kelmadi!
              </div>
            ) : (
              <>
                <h2>Ishlagan qurilmalar</h2>
                <table className="c-table mt-4">
                  <thead className="c-table__header">
                    <tr>
                      <th className="c-table__col-label text-center">
                        Qurilma nomi
                      </th>
                      <th className="c-table__col-label text-center">
                        Viloyat
                      </th>
                      <th className="c-table__col-label text-center">Tuman</th>
                      <th className="c-table__col-label text-center">
                        Latitude
                      </th>
                      <th className="c-table__col-label text-center">
                        Longitude
                      </th>
                      <th className="c-table__col-label text-center">
                        Reservoir Id
                      </th>
                      <th className="c-table__col-label text-center">
                        Telefon raqam
                      </th>
                      <th className="c-table__col-label text-center">Imei</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {dataDevices.length > 0 &&
                      dataDevices.map((element, index) => {
                        return (
                          <tr className="fs-6" key={index}>
                            <td className="c-table__cell text-center">
                              {element.name}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.region}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.district}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.lat}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.lon}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.reservoirId}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.phoneNumber}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.imei}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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

export default WorkingDevices;
