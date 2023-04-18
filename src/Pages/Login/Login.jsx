import React, { useState } from "react";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const login = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    fetch("95.130.227.80:3000/users/login", {
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
                      <img
                        src="https://smart-solution.uz/assets/img/apple-touch-icon.png"
                        alt=""
                      />
                      <span className="d-none d-lg-block fs-5">
                        Smart Solutions System
                      </span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form
                        className="row g-3 needs-validation"
                        onSubmit={login}
                      >
                        <div className="col-12">
                          <label className="form-label">Username</label>
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
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                          <div className="error mt-3 text-danger fs-5 fw-semibold d-flex align-items-center justify-content-center">
                            {error ? errorMessage : ""}
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <a href="/">Create an account</a>
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
