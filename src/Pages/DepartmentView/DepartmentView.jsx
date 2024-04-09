import React, { useEffect, useState } from "react";
import Designation from "../Designation/Designation";
import { useLoaderData } from "react-router-dom";

const DepartmentView = () => {
  const [designations, setDesignations] = useState(useLoaderData());
  
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
  console.log(designations);
  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Designation List</h1>
      <hr className="solid mt-[1rem]"></hr>
      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="overflow-x-auto">
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
                  key={designation._id}
                  deleteDesignation={deleteDesignation}
                  designation={designation}
                ></Designation>
              ))}
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

export default DepartmentView;
