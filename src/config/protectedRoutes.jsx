import { Navigate } from "react-router-dom";
import { userStore } from "../store/user";

export const routeFromRole = new Map([
  [1, "/admin"],
  [2, "/brigadist"],
  [3, "/user"],
]);

// Protege las rutas que no deben ser accesibles si el usuario ya está autenticado
export function NotAuthenticatedRoute({ children }) {
  const role = userStore((state) => state.role);
  console.log("role en NotAunthenticated", role);
  if (routeFromRole.has(role)) {
    return <Navigate to={routeFromRole.get(role)} />;
  }
  return children;
}

export function UserProtectedRoute({ children }) {
  const role = userStore((state) => state.role);
  console.log("role en UserProtected", role);
  if (role === 3 || role === 2 || role === 1) {
    return children;
  }
  return <Navigate to="/" />;
}

export function AdminProtectedRoute({ children }) {
  const role = userStore((state) => state.role);
  console.log("role en AdminProtected", role);
  if (role === 1) {
    return children;
  }
  if (routeFromRole.has(role)) {
    return <Navigate to={routeFromRole.get(role)} />;
  }
  return <Navigate to="/" />;
}

export function BrigadistProtectedRoute({ children }) {
  const role = userStore((state) => state.role);
  console.log("role en BrigadistProtected", role);
  if (role === 2) {
    return children;
  }
  if (routeFromRole.has(role)) {
    return <Navigate to={routeFromRole.get(role)} />;
  }
  return <Navigate to="/" />;
}
