import punchin from "../../assets/dashboard/punchin.svg";
import projects from "../../assets/dashboard/projects.svg";
import task from "../../assets/dashboard/task.svg";
import award from "../../assets/dashboard/award.svg";
import announcement from "../../assets/dashboard/announcements.svg";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [admin, setAdmin] = useState(false);

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

  if (admin) {
    useEffect(() => {
      fetch(`http://localhost:5000/projects`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
        });
    }, []);
  } else {
    useEffect(() => {
      fetch(
        `http://localhost:5000/projects/user/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
        });
    }, []);
  }
  if (admin) {
    useEffect(() => {
      fetch("http://localhost:5000/tasks", {
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
  } else {
    useEffect(() => {
      fetch(
        `http://localhost:5000/tasks/user/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
    }, []);
  }
  const status = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        In progress
      </div>
    </>
  );
  const handlePunchIn = async () => {
    const response = await fetch("http://localhost:5000/attendance/punch-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
    console.log(response);
  };
  const handlePunchOut = async () => {
    const response = await fetch("http://localhost:5000/attendance/punch-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
    console.log(response);
  };
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/announcements", {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Dashboard</h1>
      <hr className="solid mt-[1rem]"></hr>
      <div className=" w-full mt-[2rem]">
        <div>
          <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
            <div className="w-full flex items-center">
              <p className="text-nowrap">10:15AM - 5:30AM</p>
              <div className="w-full flex justify-end">
                <button
                  onClick={() => handlePunchIn()}
                  className="flex bg-[#8B5CF6] text-[#FFFFFF] px-[.6rem] py-[.4rem] rounded-full me-[1rem]"
                >
                  <img
                    className="me-[.4rem]"
                    src={punchin}
                    alt="Punch In Image"
                  />
                  Punch In
                </button>
                <button
                  onClick={() => handlePunchOut()}
                  className="flex bg-[#FF0000] text-[#FFFFFF] px-[.6rem] py-[.4rem] rounded-full"
                >
                  <img
                    className="me-[.4rem]"
                    src={punchin}
                    alt="Punch In Image"
                  />{" "}
                  Punch Out
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[1rem] mt-[1rem]">
            <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
              <div>
                <img src={projects} alt="" />
              </div>
              <div className="w-full text-center">
                <div>
                  <p>Project</p>
                  <p className="text-3xl font-[600] text-[#8B5CF6]">
                    {projects.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
              <div>
                <img src={task} alt="" />
              </div>
              <div className="w-full text-center">
                <div>
                  <p>Tasks</p>
                  <p className="text-3xl font-[600] text-[#8B5CF6]">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="opacity-[0.5] shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
              <div>
                <img src={award} alt="" />
              </div>
              <div className="w-full text-center ">
                <div>
                  <p>Awards</p>
                  <p className="text-3xl font-[600] text-[#8B5CF6]">25</p>
                </div>
              </div>
            </div>
            <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl flex items-center p-[1rem]">
              <div>
                <img src={announcement} alt="" />
              </div>
              <div className="w-full text-center">
                <div>
                  <p>Announcements</p>
                  <p className="text-3xl font-[600] text-[#8B5CF6]">
                    {announcements.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
