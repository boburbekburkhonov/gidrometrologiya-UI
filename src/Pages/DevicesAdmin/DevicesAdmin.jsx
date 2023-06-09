import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import { ToastContainer, toast } from "react-toastify";

const DevicesAdmin = () => {
  const [info, setInfo] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [infoId, setInfoId] = useState("");
  const [infoIdDelete, setInfoIdDelete] = useState("");
  const [infoImei, setInfoImei] = useState({});

  function createDevice(e) {
    e.preventDefault();

    const {
      nameDevice,
      district,
      region,
      latitude,
      longitude,
      reservoirId,
      phoneNumber,
      imei,
    } = e.target;

    fetch(`${apiGlobal}/info/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: nameDevice.value.length > 0 ? nameDevice.value : info.name,
        imei: imei.value.length > 0 ? imei.value : info.imei,
        region: region.value.length > 0 ? region.value : info.region,
        district: district.value.length > 0 ? district.value : info.district,
        lon: longitude.value.length > 0 ? longitude.value : info.lon,
        lat: latitude.value.length > 0 ? latitude.value : info.lat,
        phoneNumber:
          phoneNumber.value.length > 0 ? phoneNumber.value : info.phoneNumber,
        reservoirId:
          reservoirId.value.length > 0 ? reservoirId.value : info.reservoirId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setCount(count + 1);
          toast.success("Info created successfully");
        }
      });

    nameDevice.value = "";
    district.value = "";
    region.value = "";
    latitude.value = "";
    longitude.value = "";
    reservoirId.value = "";
    phoneNumber.value = "";
    imei.value = "";
  }

  function updateDevice(e) {
    e.preventDefault();

    const {
      nameDevice,
      district,
      region,
      latitude,
      longitude,
      reservoirId,
      phoneNumber,
      imei,
    } = e.target;

    fetch(`${apiGlobal}/info/update/${infoId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: nameDevice.value.length > 0 ? nameDevice.value : info.name,
        imei: imei.value.length > 0 ? imei.value : info.imei,
        region: region.value.length > 0 ? region.value : info.region,
        district: district.value.length > 0 ? district.value : info.district,
        lon: longitude.value.length > 0 ? longitude.value : info.lon,
        lat: latitude.value.length > 0 ? latitude.value : info.lat,
        phoneNumber:
          phoneNumber.value.length > 0 ? phoneNumber.value : info.phoneNumber,
        reservoirId:
          reservoirId.value.length > 0 ? reservoirId.value : info.reservoirId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setCount(count + 1);
          window.location.reload();
        }
      });
  }

  function deleteDevice() {
    fetch(`${apiGlobal}/info/delete/${infoIdDelete}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setCount(count + 1);
          toast.success("Information deleted successfully");
        }
      });
  }

  const getInfoImei = (imei) => {
    setInfoImei({});

    fetch(`${apiGlobal}/info/${imei}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setInfoImei(data);
        }
      });
  };

  useEffect(() => {
    fetch(`${apiGlobal}/info/list`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setInfo(data);
          setLoader(false);
        }
      });
  }, [count]);

  return (
    <main id="main" className="main">
      {/* Modal EDIT */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Qurilmani o'zgartirish
              </h1>
              <button
                type="button"
                className="btn-close btn-close-location"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateDevice}>
                <div className="row mb-3">
                  <label
                    htmlFor="name"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Qurilma nomi
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="nameDevice"
                      type="text"
                      className="form-control"
                      id="name"
                      defaultValue={infoImei.name}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="region"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Viloyat
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="region"
                      type="text"
                      className="form-control"
                      id="region"
                      defaultValue={infoImei.region}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="district"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Tuman
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="district"
                      type="text"
                      className="form-control"
                      id="district"
                      defaultValue={infoImei.district}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="latitude"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Latitude
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="latitude"
                      type="text"
                      className="form-control"
                      id="latitude"
                      defaultValue={infoImei.lat}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="longitude"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Longitude
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="longitude"
                      type="text"
                      className="form-control"
                      id="longitude"
                      defaultValue={infoImei.lon}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="reservoir-id"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Reservoir Id
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="reservoirId"
                      type="text"
                      className="form-control"
                      id="reservoir-id"
                      defaultValue={infoImei.reservoirId}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="phone-number"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Telefon raqam
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="phoneNumber"
                      type="text"
                      className="form-control"
                      id="name"
                      defaultValue={infoImei.phoneNumber}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="imei"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Imei
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="imei"
                      type="text"
                      className="form-control"
                      id="name"
                      defaultValue={infoImei.imei}
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary devices-btn">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CREATE */}
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Qurilma yaratish
              </h5>
              <button
                className="btn-close btn-close-location"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={createDevice}>
                <div className="row mb-3">
                  <label
                    htmlFor="name"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Qurilma nomi
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="nameDevice"
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      placeholder="Qurilma nomi"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="region"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Viloyat
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="region"
                      type="text"
                      className="form-control"
                      id="region"
                      required
                      placeholder="Viloyat"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="district"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Tuman
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="district"
                      type="text"
                      className="form-control"
                      id="district"
                      required
                      placeholder="Tuman"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="latitude"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Latitude
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="latitude"
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      placeholder="Latitude"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="longitude"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Longitude
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="longitude"
                      type="text"
                      className="form-control"
                      id="longitude"
                      required
                      placeholder="Longitude"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="reservoir-id"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Reservoir Id
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="reservoirId"
                      type="text"
                      className="form-control"
                      id="reservoir-id"
                      placeholder="Reservoir Id"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="phone-number"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Telefon raqam
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="phoneNumber"
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      placeholder="Telefon raqam"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="imei"
                    className="col-md-4 col-lg-3 col-form-label modal-label"
                  >
                    Imei
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="imei"
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      placeholder="Imei"
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary devices-btn">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PERMISSION   */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 bg-danger pt-4 pb-4 d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center w-100">
                <p className="m-0 text-light fs-6 fw-bolder">
                  Haqiqatan ham o'chirmoqchimisiz?
                </p>
              </div>
              <button
                type="button"
                className="btn-close-location btn-close-delete-devices p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="../../../src/assets/images/cancel.png"
                  alt="cancel"
                  width="18"
                  height="18"
                />
              </button>
            </div>
            <div className="modal-body fw-semibold fs-5 text-dark text-center modal-delete-device">
              O'ylab ko'ring! qurilmani oʻchirish doimiy boʻladi.
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Yo'q
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deleteDevice}
              >
                Ha
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="pagetitle">
        <section className="section dashboard">
          <div className="row">
            <div className="text-end">
              <button
                className="btn btn-primary devices-create-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLong"
              >
                Qurilma qo'shish
              </button>
            </div>

            {loader ? (
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <div className="table-scrol m-auto">
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
                      <th className="c-table__col-label text-center">
                        Foydalanuvchi
                      </th>
                      <th className="c-table__col-label text-center">
                        O'zgartirish
                      </th>
                      <th className="c-table__col-label text-center">
                        O'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {info.length > 0 &&
                      info.map((element, index) => {
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
                            <td
                              className={
                                element.user
                                  ? "c-table__cell text-center"
                                  : "c-table__cell text-danger text-center"
                              }
                            >
                              {element.user
                                ? element.user.name
                                : "Foydalanuvchi o'chirilgan"}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  getInfoImei(element.imei);
                                  setInfoId(element._id);
                                }}
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/9458/9458280.png"
                                  alt="update"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => setInfoIdDelete(element._id)}
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/9713/9713380.png"
                                  alt="update"
                                  width="16"
                                  height="16"
                                />
                              </button>
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

export default DevicesAdmin;
