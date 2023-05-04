import React, { useEffect, useState } from "react";
import { apiGlobal } from "../Api/ApiGlobal";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [userId, setUserId] = useState("");
  const [count, setCount] = useState(0);
  const [userIdDelete, setUserIdDelete] = useState("");

  function updateUser(e) {
    e.preventDefault();

    const { nameuser, username, password, email, role } = e.target;

    fetch(`${apiGlobal}/users/update/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: nameuser.value.length > 0 ? nameuser.value : undefined,
        username: username.value.length > 0 ? username.value : undefined,
        password: password.value.length > 0 ? password.value : undefined,
        email: email.value.length > 0 ? email.value : undefined,
        role: role.value.length > 0 ? role.value : undefined,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setCount(count + 1);
          window.location.reload();
        }
      });

    nameuser.value = "";
    username.value = "";
    password.value = "";
    email.value = "";
    role.value = "";
  }

  function deleteUser(id) {
    fetch(`${apiGlobal}/users/delete/${userIdDelete}`, {
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
          toast.success("User deleted successfully");
        }
      });
  }

  const getUserWithId = (id) => {
    fetch(`${apiGlobal}users/profile/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
        }
      });
  };

  useEffect(() => {
    fetch(`${apiGlobal}/users/list`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUsers(data);
          setLoader(false);
        }
      });
  }, [count]);

  return (
    <>
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
                  Foydalanuvchi ma'lumotlarini o'zgartirish
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-location"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateUser}>
                  <div className="row mb-3">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Ism
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="nameuser"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ismi"
                        defaultValue={user.name}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="district"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Foydalanuvchi nomi
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="username"
                        type="text"
                        className="form-control"
                        id="district"
                        placeholder="Foydalanuvchi nomi"
                        defaultValue={user.username}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="latitude"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Email"
                        defaultValue={user.email}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="region"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Parol
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="password"
                        type="text"
                        className="form-control"
                        id="region"
                        placeholder="Parol"
                        defaultValue={user.password}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="longitude"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Roli
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="role"
                        type="text"
                        className="form-control"
                        id="longitude"
                        placeholder="Roli"
                        defaultValue={user.role}
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
                O'ylab ko'ring! foydalanuvchini oʻchirish doimiy boʻladi.
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
                  onClick={deleteUser}
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
              {loader ? (
                <div className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <table className="c-table mt-4">
                  <thead className="c-table__header">
                    <tr>
                      <th className="c-table__col-label text-center">Ism</th>
                      <th className="c-table__col-label text-center">
                        Foydalanuvchi nomi
                      </th>
                      <th className="c-table__col-label text-center">Parol</th>
                      <th className="c-table__col-label text-center">Email</th>
                      <th className="c-table__col-label text-center">Roli</th>
                      <th className="c-table__col-label text-center">Edit</th>
                      <th className="c-table__col-label text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {users.length > 0 &&
                      users.map((element, index) => {
                        return (
                          <tr className="fs-6" key={index}>
                            <td className="c-table__cell text-center">
                              {element.name}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.username}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.password}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.email}
                            </td>
                            <td className="c-table__cell text-center">
                              {element.role}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  getUserWithId(element._id);
                                  setUserId(element._id);
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
                                onClick={() => setUserIdDelete(element._id)}
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

export default Users;
