import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success("Registration successful");
        // Optionally redirect the user to another page upon successful registration
      } else {
        console.error("Registration failed");
        // Handle registration failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
    <div className="login_bg flex justify-center items-center h-screen mx-auto">
      <div className="w-80 bg-tertiary py-10 rounded-2xl sm:w-[360px]">
        <form onSubmit={handleRegister}>
          <div className="form transparent-bg p-5 rounded-2xl">
            <img src={logo} alt="Your Logo" className="mx-auto h-15 p-5 w-auto" />
            <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              id="register-username"
              placeholder="Username"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 rounded-full"
            />
            <input
              type="password"
              id="register-password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 rounded-full"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Register
            </button>
            <Link
              to="/login"
              className="text-indigo-600 cursor-pointer text-sm mt-2 block"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Register;