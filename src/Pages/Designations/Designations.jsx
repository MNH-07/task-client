import React, { useEffect, useState } from "react";
import Designation from "../Designation/Designation";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/designations", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDesignations(data);
      });
  }, []);
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
  const deleteDesignation = (id) => {
    fetch(`http://localhost:5000/designations/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Designation deleted successfully") {
          setDesignations(
            designations.filter((designation) => designation._id !== id)
          );
        }
      });
  };
  const getName = (id) => {
    console.log(departments, id);
    return departments.filter((dep) => dep._id === id);
  };
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Designation List</h1>
      <hr className="solid mt-[1rem]"></hr>

      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="overflow-x-auto">
          <Link to="/create-designation">
            <button className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]">
              <FiPlusCircle className="pe-[.25rem]" /> Create
            </button>
          </Link>
          <table className="table w-full my-[1rem] text-center">
            {/* head */}
            <thead className="bg-[#E8DEFD]">
              <tr>
                <th className="px-[1rem] mx-auto"></th>
                <th className="px-[1rem] mx-auto">Project</th>
                <th className="px-[1rem] mx-auto">Department</th>
                <th className="px-[1rem] mx-auto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((designation) => (
                <Designation
                  getName={getName}
                  key={designation._id}
                  deleteDesignation={deleteDesignation}
                  designation={designation}
                ></Designation>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Designations;
