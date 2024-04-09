import moment from "moment";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditProject = () => {
  const {
    _id,
    title,
    startDate,
    finishDate,
    assignedEmployees,
    priority,
    progress,
    summary,
  } = useLoaderData();
  console.log(moment(startDate).format());
  const [formData, setFormData] = useState({
    title: title,
    startDate: moment(startDate).format("YYYY-MM-DD"),
    finishDate: moment(finishDate).format("YYYY-MM-DD"),
    assignedEmployees: assignedEmployees,
    priority: priority,
    progress: progress,
    summary: summary,
  });

  const [users, setUsers] = useState([]);

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve token from local storage
        const response = await fetch("http://localhost:5000/users", {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

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

  const handleRangeChange = (event) => {
    setFormData({
      ...formData,
      progress: parseInt(event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage

      const response = await fetch(`http://localhost:5000/projects/${_id}`, {
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
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Edit Project</h1>
      <hr className="solid mt-[1rem]"></hr>
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
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
              id="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              id="finishDate"
              value={formData.finishDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          {/* Assigned Employees */}
          <div>
            <label
              htmlFor="assignedEmployees"
              className="block text-sm font-medium text-gray-700"
            >
              Assigned Employees
            </label>
            <select
              id="assignedEmployees"
              name="assignedEmployees"
              multiple
              value={formData.assignedEmployees}
              onChange={handleAssignedEmployeesChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          {/* Progress */}
          <div>
            <label
              htmlFor="progress"
              className="block text-sm font-medium text-gray-700"
            >
              Progress
            </label>
            <input
              type="range"
              name="progress"
              id="progress"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleRangeChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Project
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default EditProject;
