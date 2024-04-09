import moment from "moment";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditLeave = () => {
  const { _id, userId, department, leaveType, startDate, finishDate, status } =
    useLoaderData();
  const [formData, setFormData] = useState({
    department: department,
    startDate: moment(startDate).format("YYYY-MM-DD"),
    finishDate: moment(finishDate).format("YYYY-MM-DD"),
    leaveType: leaveType,
    status: status,
  });

  // Fetch users from the server

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage

      const response = await fetch(`http://localhost:5000/tasks/${_id}/apro`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      // Handle successful response
      toast.success("Project edited successfully");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  return (
    <div className="w-full p-[2rem]">
      <p className="text-xl font-bold">{userId}</p>
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Apply Leave</h1>
      <hr className="solid mt-[1rem]" />
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* Department */}
          <div>
            <label htmlFor="department">Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Finish Date */}
          <div>
            <label
              htmlFor="finishDate"
              className="block text-sm font-medium text-gray-700"
            >
              Finish Date
            </label>
            <input
              type="date"
              name="finishDate"
              value={formData.finishDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Leave Type */}
          <div>
            <label htmlFor="leaveType">Leave Type</label>
            <input
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Apply
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default EditLeave;
