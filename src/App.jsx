import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import User from "./Pages/User/User";
import Admin from "./Pages/Admin/Admin";
import ErrorPage from "./Pages/Error/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
      ;
    </>
  );
}

export default App;
