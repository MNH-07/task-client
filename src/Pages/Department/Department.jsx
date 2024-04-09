import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import GetName from "../GetName/GetName";

const Department = ({ getName, department, deleteDepartment }) => {
  const { _id, departmentName, departmentHead } = department;
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="font-bold">{departmentName}</div>
      </td>
      <td>
        <div className="font-bold"><GetName getName={getName} nm={departmentHead}></GetName></div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <Link to={`/designation-view/${_id}`}>
            <IoEyeOutline className="text-2xl m-[.2rem]" />
          </Link>
          <Link to={`http://localhost:5173/edit-department/${_id}`}>
            <FiEdit className="text-2xl m-[.2rem] text-[#8B5CF6]" />
          </Link>
          <MdOutlineCancel
            onClick={() => deleteDepartment(_id)}
            className="text-2xl m-[.2rem] text-[#FB0000]"
          />
        </div>
      </td>
    </tr>
  );
};

export default Department;
