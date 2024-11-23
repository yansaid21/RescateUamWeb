import React from "react";
import AdminNavbar from "../../components/molecules/Navbar/AdminNavbar";
import UserNavbar from "../../components/molecules/Navbar/UserNavbar";
import AnimatedOutlet from "./AnimatedOutlet";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main>
        <AnimatedOutlet /> {/* Asegúrate de incluir Outlet aquí */}
      </main>
    </>
  );
};

export const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <main>
        <AnimatedOutlet /> {/* Asegúrate de incluir Outlet aquí */}
      </main>
    </>
  );
};
