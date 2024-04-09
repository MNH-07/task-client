import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditDesignation = () => {
  const { _id, title, departmentId } = useLoaderData();
  const [formData, setFormData] = useState({
    title: title,
    departmentId: departmentId,
  });
  const [Departments, setDepartments] = useState([]);

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
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
      departmentId: selectedEmployees,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve token from local storage
      console.log(formData);
      const response = await fetch(
        `http://localhost:5000/designations/${_id}`,
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
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Edit Designation</h1>
      <hr className="solid mt-[1rem]" />
      <form className="rounded-lg shadow-lg mt-[1rem]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-[2rem]">
          {/* Department Name */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Designation Title
            </label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Department Head */}
          <div>
            <label
              htmlFor="assignedEmployees"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              name="departmentId"
              multiple
              value={formData.departmentId}
              onChange={handleAssignedEmployeesChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {Departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.departmentName}
                </option>
              ))}
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

export default EditDesignation;
