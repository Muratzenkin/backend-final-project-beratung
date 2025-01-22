import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    profilePicture: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    data.append("profilePicture", formData.profilePicture);

    try {
      const response = await registerUser(data);
      alert(response);
      setFormData({
        username: "",
        password: "",
        email: "",
        bio: "",
        profilePicture: null,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        name="profilePicture"
        onChange={handleChange}
        className="block w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
