import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [userId, setUserId] = useState("");
  const [count, setCount] = useState(0);

  function updateDevice(e) {
    e.preventDefault();

    const { nameuser, username, password, email, role } = e.target;
    console.log(
      nameuser.value,
      username.value,
      password.value,
      email.value,
      role.value
    );
    fetch(`http://localhost:3000/users/update/${userId}`, {
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
          toast.success("User updated successfully");
        }
      });

    nameuser.value = "";
    username.value = "";
    password.value = "";
    email.value = "";
    role.value = "";
  }

  function deleteDevice(id) {
    fetch(`http://localhost:3000/users/delete/${id}`, {
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

  useEffect(() => {
    fetch("http://localhost:3000/users/list", {
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Foydalanuvchi ma'lumotini o'zgartirish
                </h1>
                <button
                  type="button"
                  className="btn-close"
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
                      Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="nameuser"
                        type="text"
                        className="form-control"
                        id="name"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="district"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Username
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="username"
                        type="text"
                        className="form-control"
                        id="district"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="region"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="password"
                        type="text"
                        className="form-control"
                        id="region"
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
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="longitude"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Role
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="role"
                        type="text"
                        className="form-control"
                        id="longitude"
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
                      <th className="c-table__col-label">Name</th>
                      <th className="c-table__col-label">UserName</th>
                      <th className="c-table__col-label">Passpord</th>
                      <th className="c-table__col-label">Email</th>
                      <th className="c-table__col-label">Role</th>
                      <th className="c-table__col-label">Edit</th>
                      <th className="c-table__col-label">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {users.length > 0 &&
                      users.map((element, index) => {
                        return (
                          <tr className="fs-6" key={index}>
                            <td className="c-table__cell">{element.name}</td>
                            <td className="c-table__cell">
                              {element.username}
                            </td>
                            <td className="c-table__cell">
                              {element.password}
                            </td>
                            <td className="c-table__cell">{element.email}</td>
                            <td className="c-table__cell">{element.role}</td>
                            <td className="c-table__cell">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => setUserId(element._id)}
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/9458/9458280.png"
                                  alt="update"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            </td>
                            <td className="c-table__cell">
                              <button
                                className="btn-devices-edit"
                                onClick={() => deleteDevice(element._id)}
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
      </main>
    </>
  );
};

export default Users;
