import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/auth/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Optionally, redirect the user to the login page after successful password reset
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred while resetting password:", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="login_bg flex justify-center items-center h-screen mx-auto">
      <div className="w-80 bg-tertiary py-10 rounded-2xl sm:w-[360px]">
        <div id="reset-password-form" className="form transparent-bg p-5 rounded-2xl">
        <img src={logo} alt="Your Logo" className="mx-auto h-15 p-5 w-auto" />
          <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
          <input
            type="password"
            id="reset-password-new"
            placeholder="New Password"
            value={newPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-2 rounded-full"
          />
          <button
            onClick={handleResetPassword}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Reset Password
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;
