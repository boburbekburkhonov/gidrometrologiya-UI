import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";
import Statistic from "../Statistic/Statistic";
import Profile from "../Profile/Profile";
import Devices from "../Devices/Devices";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <HelmetProvider>
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
            <i className="bi bi-list toggle-sidebar-btn"></i>
          </div>

          <div className="search-bar">
            <form
              className="search-form d-flex align-items-center"
              method="POST"
              action="#"
            >
              <input
                type="text"
                name="query"
                placeholder="Search"
                title="Enter search keyword"
              />
              <button type="submit" title="Search">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>

          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle " href="#">
                  <i className="bi bi-search"></i>
                </a>
              </li>

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
                    {`${
                      window.localStorage.getItem("name")[0]
                    }.${window.localStorage.getItem("username")}`}
                  </span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{`${window.localStorage.getItem(
                      "name"
                    )} ${window.localStorage.getItem("username")}`}</h6>
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
                      <span>My Profile</span>
                    </button>
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
                      <span>Statistics</span>
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
                      <span>Devices</span>
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Sign Out</span>
                    </a>
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
                <span>Statistics</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link collapsed w-100"
                onClick={() => navigate("/admin/profile")}
              >
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link collapsed w-100"
                onClick={() => navigate("/admin/devices")}
              >
                <i className="bi bi-layout-text-window-reverse"></i>
                <span>Devices</span>
              </button>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-faq.html">
                <i className="bi bi-question-circle"></i>
                <span>F.A.Q</span>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-contact.html">
                <i className="bi bi-envelope"></i>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </aside>
        <Routes>
          <Route path="/" element={<Statistic />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
        <Helmet>
          <script src="../../src/assets/vendor/apexcharts/apexcharts.min.js"></script>
          <script src="../../src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="../../src/assets/vendor/chart.js/chart.umd.js"></script>
          <script src="../../src/assets/vendor/echarts/echarts.min.js"></script>
          <script src="../../src/assets/vendor/quill/quill.min.js"></script>
          <script src="../../src/assets/vendor/simple-datatables/simple-datatables.js"></script>
          <script src="../../src/assets/vendor/php-email-form/validate.js"></script>
          <script src="../../src/assets/vendor/tinymce/tinymce.min.js"></script>

          <script src="../../src/assets/js/main.js"></script>
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default Admin;
