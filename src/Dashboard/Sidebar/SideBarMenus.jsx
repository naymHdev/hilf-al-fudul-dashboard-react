import AdminMenus from "./AdminMenus";
import { Divider } from "@mui/material";
import logo from "../../assets/hilful-fujullogo.png";

const SideBarMenus = () => {
  return (
    <>
      <div className="py-5">
        <div className="flex flex-col items-center justify-center">
          <img className=" w-36 h-auto absolute -top-5" src={logo} alt="" />
        </div>
        <div className="text-center space-y-1 mt-[108px]">
          <h2 className=" text-2xl font-extrabold">হিলফুল ফুজুল</h2>
          <p className=" font-semibold">সমাজ কল্যাণ ফাউন্ডেশন</p>
        </div>
      </div>
      <Divider />
      <AdminMenus />
    </>
  );
};

export default SideBarMenus;
