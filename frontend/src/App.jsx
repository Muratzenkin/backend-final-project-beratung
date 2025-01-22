import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import BeraterList from "./pages/BeraterList";
import Appointment from "./pages/Appointment";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/berater" element={<BeraterList />} />
        <Route path="/appointment/:beraterId" element={<Appointment />} />
      </Routes>
    </>
  );
}
