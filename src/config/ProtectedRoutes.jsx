import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "../store/user";
import { User } from "../api/user";
import { useEffect, useState } from "react";

const userController = new User();

const ProtectedRoute = ({ requiredRole }) => {
  const rawUser = userStore((state) => state.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (rawUser) {
        const token = localStorage.getItem("token");
        const userRole = await userController.getRole(token,"1",rawUser.id);
        const role = userRole.data.role.id;
        setUser({ ...rawUser, role });
      } else {
        setUser(null); // Redirige si no hay usuario en Zustand
      }
    };

    fetchUserRole();
  }, [rawUser]);

  if (user === null) return null; // Loading o similar
  
  return user?.role == requiredRole ? <Outlet /> : break;
};

export const ProtectedAdmin = () => <ProtectedRoute requiredRole="1" />;
export const ProtectedBrigadist = () => <ProtectedRoute requiredRole="2" />;
export const ProtectedUser = () => <ProtectedRoute requiredRole="3" />;
