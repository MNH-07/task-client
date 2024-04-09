import { useEffect, useState } from "react";
import navLogo from "../../assets/navlogo.png";
import profile from "../../assets/profile.svg";

const NavBar = () => {
  const [email, setEmail] = useState();
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
          console.log(data.email);
          setEmail(data.email);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchadmin();
  }, []);
  const handleLogOut = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div className="flex w-full shadow-lg p-[1rem]">
      <div>
        <img src={navLogo} alt="Logo" />
      </div>
      <div className="w-full">
        <div className="flex justify-end items-center">
          <p className="me-[1rem]">{email}</p>
          <button
            onClick={() => handleLogOut()}
            className="flex items-center text-[#FFFFFF] bg-[#8B5CF6] rounded-md px-[.5rem] py-[.25rem] me-[1rem]"
          >
            Logout
          </button>
          <img src={profile} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
