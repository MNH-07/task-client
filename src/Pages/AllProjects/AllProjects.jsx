import cancelled from "../../assets/project/cancelled.svg";
import completed from "../../assets/project/completed.svg";
import inprogress from "../../assets/project/inprogress.svg";
import notstarted from "../../assets/project/notstarted.svg";
import kanban from "../../assets/project/kanban.svg";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Project from "../Project/Project";
import axios from "axios";

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [admin, setAdmin] = useState(false);
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
  console.log(users);

  useEffect(() => {
    const fetchadmin = async () => {
      try {
        // Retrieve token from local storage
        const response = await fetch(
          `http://localhost:5000/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.isAdmin);
          setAdmin(data.isAdmin);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchadmin();
  }, []);

  console.log("admin");
  useEffect(() => {
    fetch(`http://localhost:5000/projects`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, []);

  console.log(projects);
  const getName = (employee) => {
    return users.filter((user) => user._id === employee);
  };
  const deleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Project deleted successfully") {
          setProjects(projects.filter((project) => project._id !== id));
        }
      });
  };
  if (projects.error === "Invalid token") {
    navigate("/login");
  }
  // const handleDelete = (id, title) => {
  //   const proceed = confirm(`Are you sure you want to cancel "${title}"?`);
  //   if (proceed) {
  //     fetch(`https://car-doctor-server-p2jz.onrender.com/bookings/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.deletedCount > 0) {
  //           alert("Deleted successfully");
  //           setBookings(bookings.filter((booking) => booking._id !== id));
  //         }
  //       });
  //   }
  // };
  console.log(users);
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Project List</h1>
      <hr className="solid mt-[1rem]"></hr>
      
      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        {admin && (
          <Link to="/create-project">
            <button className="flex items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]">
              <FiPlusCircle className="pe-[.25rem]" /> Create
            </button>
          </Link>
        )}
        <hr className="solid mt-[1rem]"></hr>
        <div className="flex items-center w-full mt-[1rem]">
          <div className="w-full flex justify-end items-center">
            <IoIosSearch className="me-[-1.5rem] z-[1]" />
            <input disabled
              className="z-[0] border ps-[2rem] p-[.2rem] bg-[#E8DEFD] rounded-md"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full my-[1rem] text-center">
            {/* head */}
            <thead className="bg-[#E8DEFD]">
              <tr>
                <th className="px-[1rem] mx-auto"></th>
                <th className="px-[1rem] mx-auto">Project</th>
                <th className="px-[1rem] mx-auto">Start Date</th>
                <th className="px-[1rem] mx-auto">Finish Date</th>
                <th className="px-[1rem] mx-auto">Summary</th>
                <th className="px-[1rem] mx-auto">Priority</th>
                <th className="px-[1rem] mx-auto">Assigned</th>
                <th className="px-[1rem] mx-auto">Progress</th>
                <th className={admin ? "px-[1rem] mx-auto" : "hidden"}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <Project
                  getName={getName}
                  admin={admin}
                  key={project._id}
                  deleteProject={deleteProject}
                  project={project}
                ></Project>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default AllProjects;
