import { Link, NavLink } from "react-router";
import Logo from "../assets/logo.png";
import { useEcomStore } from "@/stores/ecom-store";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const [isopen, setIsopen] = useState(false);
  console.log(Boolean(user)) 
  return (
    <nav className="bg-[#fb5b31]">
      <div className=" xl:max-w-5xl lg:max-w-4xl md:max-w-xl max-w-xl mx-auto px-5 py-3">
        <div className="flex justify-between items-center text-white font-extralight">
          <div className="flex gap-4 items-center">
            <div className="flex  items-center">
              <Link to={"/"}>
                <img src={Logo} alt="Logo Page" width={40} height={40} />
              </Link>
              <h1 className="text-2xl font-bold">ShopEasy</h1>
            </div>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? " underline font-bold" : " hover:scale-105"
              }
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? " underline font-bold" : " hover:scale-105"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? " underline font-bold" : " hover:scale-105"
              }
              to={"/cart"}
            >
              Cart
            </NavLink>
            {carts.length > 0 ? (
              <div className=" relative">
                <p className=" absolute -top-2.5 -right-1 text-[10px] bg-red-500 px-0.5 rounded">
                  {carts.length}
                </p>
                <Link to={"/cart"}>
                  <FaShoppingCart />
                </Link>
              </div>
            ) : (
              <Link to={"/cart"}>
                <FaShoppingCart />
              </Link>
            )}
          </div>

          {/* ✅  ใช้งานข้อมูล user ในการแสดงว่ามีข้อมูลไหมให้แสดงตามต้องการ */}
          {user ? (
            <div className="flex gap-4">
              <button
                onClick={() => setIsopen(!isopen)}
                className="flex items-center gap-2"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                  alt="Logo"
                />
                <FaAngleDown className={`${isopen ? "rotate-180" : ""}`} />
              </button>
              {isopen && (
                <div className=" absolute top-13 bg-white/30 backdrop-blur-md shadow-md w-24 rounded-lg z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 text-gray-400 hover:underline"
                  >
                    History
                  </Link>
                  <button
                    className="block px-4 py-2 text-gray-400 hover:underline"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to={"/register"}>Register</Link>
              <Link to={"/login"}>Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default MainNav;
