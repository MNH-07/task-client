import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditAttendance = () => {
  const { _id, userId, startTime, finishTime, status } = useLoaderData();
  const [formData, setFormData] = useState({
    userId: userId,
    startTime: startTime,
    finishTime: finishTime,
    status: status,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage
      console.log(formData);
      const response = await fetch(`http://localhost:5000/attendance/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create department");
      }

      // Handle successful response
      toast.success("Department created successfully");
    } catch (error) {
      console.error("Failed to create Department:", error);
    }
  };
  return (
    <div className="w-full p-[2rem]">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Edit Attendance</h1>
      <hr className="solid mt-[1rem]" />
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* User ID */}
          <div>
            <p className="block text-lg font-medium text-gray-700">User Id</p>
            <p className="text-sm font-medium text-gray-700">{userId}</p>
          </div>
          {/* Start Time */}
          <div>
            <p className="block text-lg font-medium text-gray-700">
              Start Time
            </p>
            <p className="text-sm font-medium text-gray-700">{startTime}</p>
          </div>
          {/* Finish Time */}
          <div>
            <p className="block text-lg font-medium text-gray-700">
              Finish Time
            </p>
            <p className="text-sm font-medium text-gray-700">{finishTime}</p>
          </div>
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Department
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default EditAttendance;
