import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="px-5 md:pl-[280px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
