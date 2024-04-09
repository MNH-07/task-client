const Leave = ({ leave }) => {
  const { _id, userId, department, leaveType, startDate, finishDate, status } =
    leave;
  console.log();
  const approve = () => {
    fetch(`http://localhost:5000/leave/${_id}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ name: "Approved" }),
    });

    location.reload();
  };
  const reject = () => {

    fetch(`http://localhost:5000/leave/${_id}/reject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ name: "Rejected" }),
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
        <div className="font-bold">{userId}</div>
      </td>
      <td>
        <div className="font-bold">{department}</div>
      </td>
      <td>
        <div className="font-bold">{leaveType}</div>
      </td>
      <td>
        <div className="font-bold">{startDate}</div>
      </td>
      <td>
        <div className="font-bold">{finishDate}</div>
      </td>
      <td>
        <div className="font-bold">{status}</div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <div className="flex">
              <button
                onClick={() => reject()}
                className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem] me-[1rem]"
              >
                Rejected
              </button>
              <button
                onClick={() => approve()}
                className="flex justify-end items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem]"
              >
                Approved
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Leave;
