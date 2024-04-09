import cancelled from "../../assets/project/cancelled.svg";
import completed from "../../assets/project/completed.svg";
import inprogress from "../../assets/project/inprogress.svg";
import notstarted from "../../assets/project/notstarted.svg";
import kanban from "../../assets/project/kanban.svg";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Task from "../Task/Task";

const ProjectView = () => {
  const [tasks, setTasks] = useState(useLoaderData());

  useEffect(() => {
    setTasks(tasks);
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

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Task deleted successfully") {
          setTasks(tasks.filter((task) => task._id !== id));
        }
      });
  };
  console.log(tasks);
  const getName = (employee) => {
    return users.filter((user) => user._id === employee);
  };
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Task List</h1>
      <hr className="solid mt-[1rem]"></hr>
      <div className="grid grid-cols-4 gap-4 w-full mt-[2rem]">
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
          <div>
            <img src={completed} alt="" />
          </div>
          <div className="w-full flex justify-center">
            <div>
              <p>Completed</p>
              <p className="text-3xl font-[600] text-[#8B5CF6]">200</p>
            </div>
          </div>
        </div>
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
          <div>
            <img src={inprogress} alt="" />
          </div>
          <div className="w-full justify-center">
            <div>
              <p>In progress</p>
              <p className="text-3xl font-[600] text-[#8B5CF6]">50</p>
            </div>
          </div>
        </div>
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
          <div>
            <img src={notstarted} alt="" />
          </div>
          <div className="w-full flex justify-center">
            <div>
              <p>Not started</p>
              <p className="text-3xl font-[600] text-[#8B5CF6]">20</p>
            </div>
          </div>
        </div>
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
          <div>
            <img src={cancelled} alt="" />
          </div>
          <div className="w-full flex justify-center">
            <div>
              <p>Cancelled</p>
              <p className="text-3xl font-[600] text-[#8B5CF6]">15</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="w-full flex justify-end">
          <button className="flex items-center text-[#00000050] bg-[#E8DEFD] rounded-md px-[.5rem] py-[.25rem] me-[1rem]">
            <img className="me-[.2rem]" src={kanban} alt="Kanban Image" />
            Kanban View
          </button>

          <Link to="/create-project">
            <button className="flex items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]">
              <FiPlusCircle className="pe-[.25rem]" /> Create
            </button>
          </Link>
        </div>
        <hr className="solid mt-[1rem]"></hr>
        <div className="flex items-center w-full mt-[1rem]">
          <select className="border join-item p-[.2rem] rounded-md">
            <option>5</option>
            <option selected>10</option>
            <option>20</option>
          </select>
          <div className="w-full flex justify-end items-center">
            <IoIosSearch className="me-[-1.5rem] z-[1]" />
            <input
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
                <th className="px-[1rem]"></th>
                <th className="px-[1rem]">Task</th>
                <th className="px-[1rem]">Project</th>
                <th className="px-[1rem]">Start Date</th>
                <th className="px-[1rem]">Finish Date</th>
                <th className="px-[1rem]">States</th>
                <th className="px-[1rem]">Assigned</th>
                <th className="px-[1rem]">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <Task
                getName={getName}
                  admin={true}
                  key={task._id}
                  task={task}
                  deleteTask={deleteTask}
                ></Task>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
        <div className="flex w-full">
          <div className="text-nowrap">Showing 0 to 0 of 0 entries</div>
          <div className="w-full flex  justify-end">
            <button className="text-[#8B5CF6] border border-[#8B5CF6] px-[.2rem] rounded-md me-[1rem]">
              {"< "}Previous
            </button>
            <button className="text-[#8B5CF6] border border-[#8B5CF6] px-[.2rem] rounded-md">
              Next{" >"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
