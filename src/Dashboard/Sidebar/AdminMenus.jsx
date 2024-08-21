import { FolderKanban, ImagePlus, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const AdminMenus = () => {
  return (
    <>
      <div className="mt-8 hover:group px-1">
        <Link
          to="/"
          className="py-3 px-5 flex items-center hover:text-green-600 font-medium gap-4 hover:bg-[#EBEFF2] hover:rounded-md hover:shadow-lg hover:transform"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          to="/addImages"
          className="py-3 px-5 flex items-center hover:text-green-600 font-medium gap-4 hover:bg-[#EBEFF2] hover:rounded-md hover:shadow-lg hover:transform"
        >
          <ImagePlus /> Add Images
        </Link>
        <Link
          to="/addProjects"
          className="py-3 px-5 flex items-center hover:text-green-600 font-medium gap-4 hover:bg-[#EBEFF2] hover:rounded-md hover:shadow-lg hover:transform"
        >
          <FolderKanban /> Add Projects
        </Link>
      </div>
    </>
  );
};

export default AdminMenus;
