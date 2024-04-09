import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    finishDate: "",
    projectId: "",
    assignedEmployees: [],
    status: "Not Started",
    progress: 0,
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

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
  // Fetch project from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Retrieve token from local storage
        const response = await fetch("http://localhost:5000/projects", {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);
  console.log(projects);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
      console.log(formData);
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      // Handle successful response
      toast.success("task created successfully");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };
  return (
    <div className="w-full p-[2rem]">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Create Task</h1>
      <hr className="solid mt-[1rem]" />
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
              id="finishDate"
              value={formData.finishDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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
          {/* Projects */}
          <div>
            <label
              htmlFor="projects"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <select
              id="projects"
              name="projectId"
              value={formData.projects}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {console.log(projects)}
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CreateTask;
