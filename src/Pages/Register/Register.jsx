import React from "react";
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

const Register = () => {
  const registerUser = (e) => {
    e.preventDefault();
    const { name, username, email, password } = e.target;

    fetch(`${apiGlobal}/users/register`, {
      method: "POST",

      body: JSON.stringify({
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          window.localStorage.setItem("token", data.access_token);
          window.location.href = "/user";
        } else if (data.statusCode) {
          alert(data.message);
        }
      });

    name.value = "";
    username.value = "";
    email.value = "";
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
                          Shaxsiy kabinet yaratish
                        </h5>
                        <p className="text-center small">
                          Shaxsiy kabinet yaratish uchun shaxsiy
                          ma'lumotlaringizni kiriting
                        </p>
                      </div>

                      <form
                        className="row g-3 needs-validation"
                        onSubmit={registerUser}
                      >
                        <div className="col-12">
                          <label className="form-label">Ismingiz</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="yourName"
                            required
                          />
                        </div>

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
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            required
                          />
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
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100">
                            Ro'yxatdan o'tish
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Men ro'yxatdan o'tganman <a href="/">Kirish</a>
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

export default Register;
