import HeaderAdmin from "@/admin/HeaderAdmin";
import SidaebarAdmin from "@/admin/SidaebarAdmin";
import { Outlet } from "react-router";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidaebarAdmin />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-[#f5f5f5] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default LayoutAdmin;
