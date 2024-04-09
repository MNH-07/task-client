import { useEffect, useState } from "react";
import Department from "../Department/Department";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/departments", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
      });
  }, []);
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
  const deleteDepartment = (id) => {
    fetch(`http://localhost:5000/departments/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Department deleted successfully") {
          setDepartments(
            departments.filter((department) => department._id !== id)
          );
        }
      });
  };
  const getName = (employee) => {
    return users.filter((user) => user._id === employee);
  };
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Department List</h1>
      <hr className="solid mt-[1rem]"></hr>

      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <Link to="/create-department">
          <button className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]">
            <FiPlusCircle className="pe-[.25rem]" /> Create
          </button>
        </Link>
        <div className="overflow-x-auto">
          <table className="table w-full my-[1rem] text-center">
            {/* head */}
            <thead className="bg-[#E8DEFD]">
              <tr>
                <th className="px-[1rem] mx-auto"></th>
                <th className="px-[1rem] mx-auto">Project</th>
                <th className="px-[1rem] mx-auto">Assigned</th>
                <th className="px-[1rem] mx-auto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <Department
                  getName={getName}
                  key={department._id}
                  deleteDepartment={deleteDepartment}
                  department={department}
                ></Department>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;
