import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import GetName from "../GetName/GetName";
import GetDepartment from "../GetDepartment/GetDepartment";

const Designation = ({ getName, designation, deleteDesignation}) => {
    console.log(designation);
  // const getDepartment =
  const { _id, title, departmentId } = designation;
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
        <div className="font-bold"><GetDepartment getName={getName} nm={departmentId}></GetDepartment></div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <Link>
            <IoEyeOutline className="text-2xl m-[.2rem]" />
          </Link>
          <Link to={`http://localhost:5173/edit-designation/${_id}`}>
            <FiEdit className="text-2xl m-[.2rem] text-[#8B5CF6]" />
          </Link>
          <MdOutlineCancel
            onClick={() => deleteDesignation(_id)}
            className="text-2xl m-[.2rem] text-[#FB0000]"
          />
        </div>
      </td>
    </tr>
  );
};

export default Designation;
