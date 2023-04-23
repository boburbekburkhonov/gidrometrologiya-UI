import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { apiGlobal } from "../Api/ApiGlobal";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";
import Profile from "../Profile/Profile";
import StatisticAdmin from "../StatisticAdmin/StatisticAdmin";
import LastDataAdmin from "../LastDataAdmin/LastDataAdmin";
import WorkingDevicesAdmin from "../WorkingDevicesAdmin/WorkingDevicesAdmin";
import HistoryAdmin from "../HistoryAdmin/HistoryAdmin";
import LocationAdminList from "../LocationAdmin/LocationAdminList";
import Users from "../Users/Users";
import DevicesAdmin from "../DevicesAdmin/DevicesAdmin";
import ErrorPage from "../Error/ErrorPage";

const Admin = () => {
  const token = window.localStorage.getItem("token");
  const [dataProfile, setDataProfile] = useState([]);
  const [loader, setLoader] = useState(true);

  if (!token) {
    window.location.href = "/login";
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiGlobal}/users/profile`, {
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
  }, []);

  return (
    <HelmetProvider>
      <>
        {loader ? (
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : dataProfile.role != "admin" ? (
          <ErrorPage />
        ) : (
          <div>
            <header
              id="header"
              className="header fixed-top d-flex align-items-center"
            >
              <div className="d-flex align-items-center justify-content-between">
                <a href="#" className="logo d-flex align-items-center">
                  <img
                    src="https://smart-solution.uz/assets/img/apple-touch-icon.png"
                    alt=""
                  />
                  <span className="d-none d-lg-block fs-5">
                    Smart Solutions System
                  </span>
                </a>
                <button className="toggle-sidebar-btn">
                  <i className="bi bi-list"></i>
                </button>
              </div>

              <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                  <li className="nav-item dropdown">
                    <a className="nav-link nav-icon" href="#">
                      <i className="bi bi-bell"></i>
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a className="nav-link nav-icon" href="#">
                      <i className="bi bi-chat-left-text"></i>
                    </a>
                  </li>

                  <li className="nav-item dropdown pe-3">
                    <a
                      className="nav-link nav-profile d-flex align-items-center pe-0"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <span className="d-none d-md-block dropdown-toggle ps-2">
                        {`${dataProfile.name} ${dataProfile.username}`}
                      </span>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li className="dropdown-header">
                        <h6>{`${dataProfile.name} ${dataProfile.username}`}</h6>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin")}
                        >
                          <i className="bi bi-bar-chart"></i>
                          <span>Statistika</span>
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin/devices")}
                        >
                          <i className="bi bi-layout-text-window-reverse"></i>
                          <span>Qurilmalar</span>
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin/history")}
                        >
                          <i className="bi bi-archive"></i>

                          <span>Tarix</span>
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin/location")}
                        >
                          <i className="bi bi-geo-alt-fill"></i>

                          <span>Lokatsiya</span>
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin/users")}
                        >
                          <i className="bi bi-people"></i>

                          <span>Foydalanuvchilar</span>
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => navigate("/admin/profile")}
                        >
                          <i className="bi bi-person"></i>
                          <span>Mening Profilim</span>
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={logout}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Chiqish</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </header>
            <aside id="sidebar" className="sidebar">
              <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin")}
                  >
                    <i className="bi bi-bar-chart"></i>
                    <span>Statistika</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin/history")}
                  >
                    <i className="bi bi-archive"></i>
                    <span>Tarix</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin/location")}
                  >
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Lokatsiya</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin/devices")}
                  >
                    <i className="bi bi-layout-text-window-reverse"></i>
                    <span>Qurilmalar</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin/users")}
                  >
                    <i className="bi bi-people"></i>
                    <span>Foydalanuvchilar</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link collapsed w-100"
                    onClick={() => navigate("/admin/profile")}
                  >
                    <i className="bi bi-person"></i>
                    <span>Profil</span>
                  </button>
                </li>

                <li className="nav-item">
                  <button className="nav-link collapsed w-100" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Chiqish</span>
                  </button>
                </li>
              </ul>
            </aside>
            <Helmet>
              <script src="/src/assets/vendor/apexcharts/apexcharts.min.js"></script>
              <script src="/src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
              <script src="/src/assets/vendor/chart.js/chart.umd.js"></script>
              <script src="/src/assets/vendor/echarts/echarts.min.js"></script>
              <script src="/src/assets/vendor/quill/quill.min.js"></script>
              <script src="/src/assets/vendor/simple-datatables/simple-datatables.js"></script>
              <script src="/src/assets/vendor/php-email-form/validate.js"></script>
              <script src="/src/assets/vendor/tinymce/tinymce.min.js"></script>

              <script src="/src/assets/js/main.js"></script>
            </Helmet>
            <Routes>
              <Route path="/" element={<StatisticAdmin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/devices" element={<DevicesAdmin />} />
              <Route path="/location" element={<LocationAdminList />} />
              <Route path="/history" element={<HistoryAdmin />} />
              <Route
                path="/working/devices/:term"
                element={<WorkingDevicesAdmin />}
              />
              <Route path="/mqtt/:term" element={<LastDataAdmin />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
        {}
      </>
    </HelmetProvider>
  );
};

export default Admin;
