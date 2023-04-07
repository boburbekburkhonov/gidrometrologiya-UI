import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);

  function updateUserInformation(e) {
    e.preventDefault();

    const { name, fullUserName, email, password } = e.target;

    fetch(`http://localhost:3000/users/update/profile`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name.value.length > 0 ? name.value : dataProfile.name,
        username:
          fullUserName.value.length > 0
            ? fullUserName.value
            : dataProfile.username,
        email: email.value.length > 0 ? email.value : dataProfile.email,
        password:
          password.value.length > 0 ? password.value : dataProfile.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setCount(count + 1);
          toast.success("Information updated successfully");
        }
      });

    name.value = "";
    fullUserName.value = "";
    email.value = "";
    password.value = "";
  }

  useEffect(() => {
    fetch(`http://localhost:3000/users/profile`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDataProfile(data);
          setLoader(false);
        }
      });
  }, [count]);

  return (
    <main id="main" className="main">
      {/* ToastContainer  */}
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
              <>
                <div className="col-xl-4">
                  <div className="card">
                    <div className="card-body profile-card pt-4 d-flex justify-content-center align-items-center">
                      <img
                        src="../../src/assets/images/user.png"
                        alt="user"
                        width="30"
                        height="30"
                      />
                      <h2 className="m-0 ms-3">{`${dataProfile.name} ${dataProfile.username}`}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-xl-8">
                  <div className="card">
                    <div className="card-body pt-3">
                      <ul className="nav nav-tabs nav-tabs-bordered">
                        <li className="nav-item">
                          <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-overview"
                          >
                            Overview
                          </button>
                        </li>

                        <li className="nav-item">
                          <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-edit"
                          >
                            Edit Profile
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content pt-2">
                        <div
                          className="tab-pane fade show active profile-overview"
                          id="profile-overview"
                        >
                          <h5 className="card-title">Profile Details</h5>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Name</div>
                            <div className="col-lg-9 col-md-8">
                              {dataProfile.name}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Username
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {dataProfile.username}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">Email</div>
                            <div className="col-lg-9 col-md-8">
                              {dataProfile.email}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Password
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {dataProfile.password}
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade profile-edit pt-3"
                          id="profile-edit"
                        >
                          <form onSubmit={updateUserInformation}>
                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Name
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  id="name"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Username
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  name="fullUserName"
                                  type="text"
                                  className="form-control"
                                  id="fullName"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Email
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  name="email"
                                  type="text"
                                  className="form-control"
                                  id="email"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Password
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  name="password"
                                  type="text"
                                  className="form-control"
                                  id="password"
                                />
                              </div>
                            </div>
                            <div className="text-end">
                              <button className="btn btn-primary">
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
