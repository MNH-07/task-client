import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    joiningDate: "",
    dateOfBirth: "",
    departmentId: "",
    designationId: "",
    status: "",
  });
  const [users, setUsers] = useState([]);
  const [userInfo, setInfo] = useState();
  const [departments, setDepartments] = useState([]);
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
  useEffect(() => {
    fetch(`http://localhost:5000/users/66031694f3f87173e400512d`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const {
          firstName,
          lastName,
          phoneNumber,
          address,
          joiningDate,
          dateOfBirth,
          departmentId,
          designationId,
          status,
        }= data;
        setFormData({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
          joiningDate: moment(joiningDate).format("YYYY-MM-DD"),
          dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
          departmentId: departmentId,
          designationId: designationId,
          status: status,
        });
      });
  }, []);

  // Fetch Department from the server
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        // Retrieve token from local storage
        const response = await fetch("http://localhost:5000/departments", {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error("Failed to fetch department");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };
    fetchDepartment();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDepartmentChange = (event) => {
    const { options } = event.target;
    const selectedEmployees = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      departmentId: selectedEmployees,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage

      const response = await fetch("http://localhost:5000/users/66031694f3f87173e400512d", {
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
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  return (
    <div>
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* First Name*/}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Last Name*/}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Joining Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Department */}
          <div>
            <label
              htmlFor="assignedEmployees"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="assignedEmployees"
              name="departmentId"
              multiple
              value={formData.departmentId}
              onChange={handleDepartmentChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.departmentName}
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
