import { useEffect, useState } from "react";
import Leave from "../Leave/Leave";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    const fetchLeaves= () =>{fetch(`http://localhost:5000/leave`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLeaves(data);
        });}
    fetchLeaves();
  }, []);

  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Leaves List</h1>
      <hr className="solid mt-[1rem]"></hr>

      <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] w-full mt-[3rem] rounded-xl p-[1rem]">
        <div className="overflow-x-auto">
          <table className="table w-full my-[1rem] text-center">
            {/* head */}
            <thead className="bg-[#E8DEFD]">
              <tr>
                <th className="px-[1rem] mx-auto"></th>
                <th className="px-[1rem] mx-auto">Employee</th>
                <th className="px-[1rem] mx-auto">Department</th>
                <th className="px-[1rem] mx-auto">Leave Type</th>
                <th className="px-[1rem] mx-auto">Start Date</th>
                <th className="px-[1rem] mx-auto">Finish Date</th>
                <th className="px-[1rem] mx-auto">Status</th>
                <th className="px-[1rem] mx-auto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <Leave key={leave._id} leave={leave}></Leave>
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

export default Leaves;
