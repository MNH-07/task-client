import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const Main = () => {
  return <div>
    <NavBar></NavBar>
    <div className="flex">
      <SideBar></SideBar>
      <Outlet></Outlet>
    </div>
  </div>;
};

export default Main;
