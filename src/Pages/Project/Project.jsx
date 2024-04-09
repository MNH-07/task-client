import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import GetName from "../GetName/GetName";
import { useEffect, useState } from "react";

const Project = ({ getName, admin, project, deleteProject }) => {
  const {
    _id,
    title,
    startDate,
    finishDate,
    summary,
    progress,
    priority,
    assignedEmployees,
  } = project;

  const medium = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        Medium
      </div>
    </>
  );
  const high = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        High
      </div>
    </>
  );
  const low = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        Low
      </div>
    </>
  );
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="font-bold">{title}</div>
      </td>
      <td>
        <div className="mx-auto w-fit">
          {moment(startDate).format("MMM Do YY")}
        </div>
      </td>
      <td>
        <div className="mx-auto w-fit">
          {moment(finishDate).format("MMM Do YY")}
        </div>
      </td>
      <td>
        <div className="mx-auto w-fit">{summary ? summary : "N/A"}</div>
      </td>
      <td>
        {priority === "Medium" && medium}
        {priority === "High" && high}
        {priority === "Low" && low}
      </td>
      {admin && (
        <td>
          <div className="mx-auto w-fit">
            {assignedEmployees.map((nm) => (
              <GetName key={nm} getName={getName} nm={nm}></GetName>
            ))}
          </div>
        </td>
      )}
      <td>
        <div className="mx-auto w-fit">
          {progress === "In Progress" ? "0%" : `${progress}%`}
        </div>
      </td>
      <td>
        <div className={admin ? "flex justify-center items-center" : "hidden"}>
          <Link to={`/project-view/${_id}`}>
            <IoEyeOutline className="text-2xl m-[.2rem]" />
          </Link>
          <Link to={`http://localhost:5173/edit-project/${_id}`}>
            <FiEdit className="text-2xl m-[.2rem] text-[#8B5CF6]" />
          </Link>
          <MdOutlineCancel
            onClick={() => deleteProject(_id)}
            className="text-2xl m-[.2rem] text-[#FB0000]"
          />
        </div>
      </td>
    </tr>
  );
};

export default Project;
