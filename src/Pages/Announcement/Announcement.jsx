import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Announcement = ({ admin, announcement, deleteAnnouncement }) => {
  const { _id, title, content } = announcement;
  
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
        <div className="font-bold">{content}</div>
      </td>
      {admin && <td>
        <div className="flex justify-center items-center">
          <Link to={`http://localhost:5173/view-announcement/${_id}`}>
            <IoEyeOutline className="text-2xl m-[.2rem]" />
          </Link>
          <Link to={`http://localhost:5173/edit-announcement/${_id}`}>
            <FiEdit className="text-2xl m-[.2rem] text-[#8B5CF6]" />
          </Link>
          <MdOutlineCancel
            onClick={() => deleteAnnouncement(_id)}
            className="text-2xl m-[.2rem] text-[#FB0000]"
          />
        </div>
      </td>}
    </tr>
  );
};

export default Announcement;
