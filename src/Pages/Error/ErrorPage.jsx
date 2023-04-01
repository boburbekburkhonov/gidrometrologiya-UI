import React from "react";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";
import notFound from "../../assets/images/not-found.svg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <main>
        <div className="container pt-4">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <button
              onClick={() => navigate(-1)}
              className="btn"
              href="index.html"
            >
              Back to home
            </button>
            <img
              src={notFound}
              className="img-fluid py-5"
              alt="Page Not Found"
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
