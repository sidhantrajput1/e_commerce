import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

const SideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l border border-gray-300 border-r-0 ${
              isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.add_icon} alt="" className="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l border border-gray-300 border-r-0 ${
              isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l border border-gray-300 border-r-0 ${
              isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
