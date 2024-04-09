import { Link } from "react-router-dom";
import accounting from "../../assets/sidebar/accounting.svg";
import attendance from "../../assets/sidebar/attendance.svg";
import dashboard from "../../assets/sidebar/dashboard.svg";
import employee from "../../assets/sidebar/employee.svg";
// import hrm from "../../assets/sidebar/hrm.svg";
import leave from "../../assets/sidebar/leave.svg";
import overview from "../../assets/sidebar/overview.svg";
import projects from "../../assets/sidebar/projects.svg";
import report from "../../assets/sidebar/report.svg";
import tasks from "../../assets/sidebar/tasks.svg";
import training from "../../assets/sidebar/training.svg";
import { useEffect, useState } from "react";

const SideBar = () => {
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
  return (
    <div className="text-center shadow-[0_20px_20px_0px_rgba(0,0,0,0.3)]">
      <Link to="/">
        <div className="my-[1rem]">
          <img className="mx-auto" src={dashboard} alt="" />
          <p>Dashboard</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      <Link to="/overview">
        <div className="my-[1rem]">
          <img className="mx-auto" src={overview} alt="" />
          <p>Overview</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      <Link to="/projects">
        <div className="my-[1rem]">
          <img className="mx-auto" src={projects} alt="" />
          <p>Projects</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      {admin && (
        <div>
          <Link to="/all-projects">
            <div className="my-[1rem]">
              <img className="mx-auto" src={projects} alt="" />
              <p>All Projects</p>
            </div>
          </Link>
          <hr className="solid"></hr>
        </div>
      )}
      <Link to="/tasks">
        <div className="my-[1rem]">
          <img className="mx-auto" src={tasks} alt="" />
          <p>Tasks</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      {admin && (
        <div>
          <Link to="/all-tasks">
            <div className="my-[1rem]">
              <img className="mx-auto" src={tasks} alt="" />
              <p>All Tasks</p>
            </div>
          </Link>
          <hr className="solid"></hr>
        </div>
      )}
      {/* <Link>
        <div className="my-[1rem]">
          <img className="mx-auto" src={hrm} alt="" />
          <p>HRM</p>
        </div>
      </Link>
      <hr className="solid"></hr> */}
      {admin && (
        <div>
          <Link to="/departments">
            <div className="my-[1rem]">
              <img className="mx-auto" src={employee} alt="" />
              <p>Department</p>
            </div>
          </Link>
          <hr className="solid"></hr>
          <Link to="/designations">
            <div className="my-[1rem]">
              <img className="mx-auto" src={employee} alt="" />
              <p>Designation</p>
            </div>
          </Link>
          <hr className="solid"></hr>
        </div>
      )}
      <Link to="/attendances">
        <div className="my-[1rem]">
          <img className="mx-auto" src={attendance} alt="" />
          <p>Attendance</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      <Link to="/announcements">
        <div className="my-[1rem]">
          <img className="mx-auto" src={accounting} alt="" />
          <p>Announcements</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      {admin && (
        <div>
          <Link to="/create-announcement">
            <div className="my-[1rem]">
              <img className="mx-auto" src={accounting} alt="" />
              <p>Announcement</p>
            </div>
          </Link>
          <hr className="solid"></hr>
        </div>
      )}
      <Link to="/create-leave">
        <div className="my-[1rem]">
          <img className="mx-auto" src={leave} alt="" />
          <p>Leave request</p>
        </div>
      </Link>
      <hr className="solid"></hr>
      {admin && (
        <Link to="/leaves">
          <div className="my-[1rem]">
            <img className="mx-auto" src={leave} alt="" />
            <p>Leave requests</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
