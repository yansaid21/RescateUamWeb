import { Navigate, Outlet } from "react-router-dom";

  export function adminLoader () {

    const role = localStorage.getItem("role");
    console.log("role en loader", role);
    
    if (role != 1 || role == null) {
      console.log("redireccionando a register");
      
      return <Navigate to="/register" replace />;
    }
    return <Outlet/>;
  
};
export function brigadistLoader () {

  const role = localStorage.getItem("role");
  console.log("role en loader", role);
  
  if (role != 2 || role == null) {
    console.log("redireccionando a register");
    
    return <Navigate to="/register" replace />;
  }
  return <Outlet/>;

};
export function userLoader () {

  const role = localStorage.getItem("role");
  console.log("role en loader", role);
  
  if (role != 3 || role == null) {
    console.log("redireccionando a register");
    
    return <Navigate to="/register" replace />;
  }
  return <Outlet/>;

};