import { useEffect, useState } from "react";
import Attendance from "../Attendance/Attendance";
import { useNavigate } from "react-router-dom";

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();
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
      fetch(`http://localhost:5000/attendance`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAttendances(data);
        });
    }, []);
  } else {
    useEffect(() => {
      fetch(
        `http://localhost:5000/attendance/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAttendances(data);
        });
    }, []);
  }

  console.log(attendances);
  if (attendances.error) {
    navigate("/login");
  }
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Attendance List</h1>
      <hr className="solid mt-[1rem]"></hr>

      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="overflow-x-auto">
          <table className="table w-full my-[1rem] text-center">
            {/* head */}
            <thead className="bg-[#E8DEFD]">
              <tr>
                <th className="px-[1rem] mx-auto"></th>
                <th className="px-[1rem] mx-auto">Employee</th>
                <th className="px-[1rem] mx-auto">StartTime</th>
                <th className="px-[1rem] mx-auto">finishTime</th>
                <th className="px-[1rem] mx-auto">Status</th>
                {admin && <th className="px-[1rem] mx-auto">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <Attendance
                  admin={admin}
                  key={attendance._id}
                  attendance={attendance}
                ></Attendance>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Attendances;
