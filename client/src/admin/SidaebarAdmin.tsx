import { CiFolderOn } from "react-icons/ci";
import { NavLink } from "react-router";
import { CiLogout } from "react-icons/ci";

const SidaebarAdmin = () => {
  return (
    <div className="w-50 flex flex-col justify-between">
      <div className="text-center border-b py-5">
        <h1 className="font-bold text-xl">Sidaebar</h1>
      </div>
      <div className="flex-1 pt-5 px-5 space-y-3 ">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
              : "flex items-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5"
          }
        >
          <CiFolderOn className="text-blue-600 text-xl" />
          <p className="font-extralight">Documents</p>
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
              : "flex items-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5"
          }
        >
          <CiFolderOn className="text-blue-600 text-xl" />
          <p className="font-extralight">Manage</p>
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
              : "flex items-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5"
          }
        >
          <CiFolderOn className="text-blue-600 text-xl" />
          <p className="font-extralight">Category</p>
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
              : "flex items-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5"
          }
        >
          <CiFolderOn className="text-blue-600 text-xl" />
          <p className="font-extralight">Product</p>
        </NavLink>
        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
              : "flex items-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5"
          }
        >
          <CiFolderOn className="text-blue-600 text-xl" />
          <p className="font-extralight">orders</p>
        </NavLink>
      </div>
      <div className="px-2 py-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center gap-1.5 rounded-lg p-0.5 bg-gray-100"
                : "flex items-center justify-center gap-1.5 hover:bg-gray-100 hover:underline rounded-lg p-0.5 underline"
            }
          >
            <CiLogout/>
            <p className="font-extralight">Logout</p>
          </NavLink>
        </div>
    </div>
  );
};
export default SidaebarAdmin;
