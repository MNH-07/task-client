import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import GetName from "../GetName/GetName";

const Task = ({ getName, admin, task, deleteTask }) => {
  const {
    _id,
    title,
    startDate,
    finishDate,
    summary,
    projectId,
    assignedEmployees,
    status,
  } = task;
  console.log(assignedEmployees);

  const notStarted = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        Not Started
      </div>
    </>
  );
  const inProgress = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        In Progress
      </div>
    </>
  );
  const completed = (
    <>
      <div className="py-[.2rem] px-[.4rem] text-[#FFFFFF] bg-[#8B5CF6] rounded-md">
        Completed
      </div>
    </>
  );
  const submitNotStarted = () => {
    fetch(`http://localhost:5000/tasks/${_id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ status: "Not Started" }),
    });
    location.reload();
  };
  const submitInProgress = () => {
    fetch(`http://localhost:5000/tasks/${_id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ status: "In Progress" }),
    });
    location.reload();
  };
  const submitCompleted = () => {
    fetch(`http://localhost:5000/tasks/${_id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ status: "Completed" }),
    });
    location.reload();
  };
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
      {admin ? (
        <td>
          {status === "Not Started" && notStarted}
          {status === "In Progress" && inProgress}
          {status === "Completed" && completed}
        </td>
      ) : (
        <td className="flex justify-center">
          <div>
            <label
              htmlFor="title"
              className="block font-bold text-xl mb-[1rem] text-sm font-medium text-gray-700"
            >
              {status}
            </label>

            <div className="flex">
              <button
                onClick={() => submitNotStarted()}
                className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem] me-[1rem]"
              >
                Not Started
              </button>
              <button
                onClick={() => submitInProgress()}
                className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem] me-[1rem]"
              >
                In Progress
              </button>
              <button
                onClick={() => submitCompleted()}
                className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]"
              >
                Completed
              </button>
            </div>
          </div>
        </td>
      )}

      {admin && (
        <td>
          <div className="mx-auto w-fit">
            {assignedEmployees.map((employee) => (
              <GetName key={employee} getName={getName} nm={employee}></GetName>
            ))}
          </div>
        </td>
      )}
      {admin && (
        <td>
          <div className="flex justify-center items-center">
            <Link to={`http://localhost:5173/edit-task/${_id}`}>
              <FiEdit className="text-2xl m-[.2rem] text-[#8B5CF6]" />
            </Link>
            <MdOutlineCancel
              onClick={() => deleteTask(_id)}
              className="text-2xl m-[.2rem] text-[#FB0000]"
            />
          </div>
        </td>
      )}
    </tr>
  );
};

export default Task;
