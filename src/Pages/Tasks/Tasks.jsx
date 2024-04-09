import cancelled from "../../assets/project/cancelled.svg";
import completed from "../../assets/project/completed.svg";
import inprogress from "../../assets/project/inprogress.svg";
import notstarted from "../../assets/project/notstarted.svg";
import kanban from "../../assets/project/kanban.svg";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Task from "../Task/Task";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/user/tasks`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
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

      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="w-full flex justify-end">
          {admin && (
            <Link to="/create-tasks">
              <button className="flex items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]">
                <FiPlusCircle className="pe-[.25rem]" /> Create
              </button>
            </Link>
          )}
        </div>
        <hr className="solid mt-[1rem]"></hr>
        <div className="flex items-center w-full mt-[1rem]">
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
                <th className="px-[1rem]">Status</th>
                {admin && <th className="px-[1rem]">Assigned</th>}
                {admin && <th className="px-[1rem]">Action</th>}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <Task
                  getName={getName}
                  admin={admin}
                  key={task._id}
                  task={task}
                  deleteTask={deleteTask}
                ></Task>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;


