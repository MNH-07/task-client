import moment from "moment";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";


const EditStatus = () => {
  const {
    _id,
    title,
    startDate,
    finishDate,
    projectId,
    status,
    assignedEmployees,
    summary,
  } = useLoaderData();
  const [formData, setFormData] = useState({
    status: status,
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAssignedEmployeesChange = (event) => {
    const { options } = event.target;
    const selectedEmployees = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      assignedEmployees: selectedEmployees,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage

      const response = await fetch(
        `http://localhost:5000/tasks/:id/status/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
          body: JSON.stringify(formData),
        }
      );

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
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Edit Task</h1>
      <hr className="solid mt-[1rem]"></hr>
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <p>{title}</p>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <p>{startDate}</p>
          </div>

          {/* Finish Date */}
          <div>
            <label
              htmlFor="finishDate"
              className="block text-sm font-medium text-gray-700"
            >
              Finish Date
            </label>
            <p>{finishDate}</p>
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
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          

          {/* Summary */}
          <div>
            <label htmlFor="summary">Summary:</label>
            <p>{summary}</p>
          </div>
          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStatus;
