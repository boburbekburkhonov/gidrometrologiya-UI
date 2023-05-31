import React, { useState } from "react";
import { apiGlobal } from "../Api/ApiGlobal";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";
import smart from "../../assets/images/logo.svg";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const login = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    fetch(`${apiGlobal}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          window.localStorage.setItem("token", data.access_token);
          window.localStorage.setItem("role", data.role);
          if (data.role == "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/user";
          }
        } else if (data.statusCode) {
          setError(true);
          setErrorMessage(data.message);
        }
      });

    username.value = "";
    password.value = "";
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="#"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={smart} alt="smart" />
                      <span className="d-none d-lg-block fs-5">
                        Smart Solutions System
                      </span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Shaxsiy kabinetga kirish
                        </h5>
                        <p className="text-center small">
                          Kirish uchun foydalanuvchi nomingiz va parolingizni
                          kiriting
                        </p>
                      </div>

                      <form
                        className="row g-3 needs-validation"
                        onSubmit={login}
                      >
                        <div className="col-12">
                          <label className="form-label">
                            Foydalanuvchi nomi
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Parol</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                          <div className="error mt-3 text-danger fs-6 fw-semibold d-flex align-items-center justify-content-center text-center">
                            {error ? errorMessage : ""}
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Kirish
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Shaxsiy kabinetingiz yo'qmi?{" "}
                            <a href="/register">Ro'yxatdan o'tish</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
