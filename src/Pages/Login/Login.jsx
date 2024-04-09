import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, userId } = data; //  the token is returned as 'token' in the response

        // Store the token in local storage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);

        // Show success toast
        toast.success("Login successful");
        navigate("/", { replace: true });
        // Optionally redirect the user to another page upon successful login
      } else {
        console.error("Login failed");
        // Handle login failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div className="login_bg flex justify-center items-center h-screen mx-auto">
      <div className="w-80 bg-tertiary py-10 rounded-2xl sm:w-[360px]">
        <form onSubmit={handleLogin}>
          <div className="form transparent-bg p-5 rounded-2xl">
            <img
              src={logo}
              alt="Your Logo"
              className="mx-auto h-15 p-5 w-auto"
            />
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <input
              type="text"
              id="login-username"
              placeholder="Username"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 rounded-full"
            />
            <input
              type="password"
              id="login-password"
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
              Login
            </button>
            <Link
              to="/forget-password"
              className="text-indigo-600 cursor-pointer text-sm mt-2 block"
            >
              Forgot Password?
            </Link>

            <Link
              to="/register"
              className="text-indigo-600 cursor-pointer text-sm mt-2 block"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Login;
