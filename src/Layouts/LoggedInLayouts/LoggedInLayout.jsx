import React from "react";
import AdminNavbar from "../../components/molecules/Navbar/AdminNavbar";
import UserNavbar from "../../components/molecules/Navbar/UserNavbar";
import AnimatedOutlet from "./AnimatedOutlet";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main>
        <AnimatedOutlet />
      </main>
    </>
  );
};

export const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <main>
        <AnimatedOutlet />
      </main>
    </>
  );
};
