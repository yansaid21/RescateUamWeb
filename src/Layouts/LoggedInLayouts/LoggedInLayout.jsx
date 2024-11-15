import React from 'react';
import AdminNavbar from '../../components/molecules/Navbar/AdminNavbar';
import UserNavbar from '../../components/molecules/Navbar/UserNavbar';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main>
        <Outlet /> {/* Asegúrate de incluir Outlet aquí */}
      </main>
    </>
  );
};

export const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <main>
        <Outlet /> {/* Asegúrate de incluir Outlet aquí */}
      </main>
    </>
  );
};