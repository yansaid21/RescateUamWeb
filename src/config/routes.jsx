import { Login } from "../components/screens/login/Login";
import { Main } from "../components/screens/main/Main";
import { MeetPointList } from "../components/screens/MeetPointList/MeetPointList";
import { Register } from "../components/screens/register/Register";
import { ReportList } from "../components/screens/ReportList/ReportList";
import { Menu } from "../components/screens/Menu/Menu";
import { AdminLayout, UserLayout } from "../Layouts/LoggedInLayouts/LoggedInLayout";
import { ProtocolsMenu } from "../components/screens/Menu/ProtocolsMenu";
import { RisksMenu } from "../components/screens/Menu/RisksMenu";
import { CreateRiskSituation } from "../components/screens/CreateRiskSituation/CreateRiskSituation";
import UsersStatus from "../components/screens/UsersStatus/UsersStatus";
import { createBrowserRouter } from "react-router-dom";
import { adminLoader } from "./ProtectedRoutes";
import { Structure } from "../components/screens/Structure/Structure";



export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "report", element: <ReportList /> },
      { path: "meetpoint", element: <MeetPointList /> },
      { path: "menu", element: <Menu /> },
      { path: "usersStatistics", element: <UsersStatus /> }, // Corrección aquí
      { path: "protocols-menu", element: <ProtocolsMenu /> }, // Consistencia en nombres
      { path: "risks-menu", element: <RisksMenu /> }, // Consistencia en nombres
      { path: "/main/structure", component: Structure},
      {
        path: "risks-menu/create-risk-situation",
        element: <CreateRiskSituation />,
      }, // Consistencia en nombres
    ],
    adminLoader,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "report", element: <ReportList /> },
      { path: "meetpoint", element: <MeetPointList /> },
      { path: "menu", element: <Menu /> },
      { path: "usersStatistics", element: <UsersStatus /> }, // Corrección aquí
      { path: "protocols-menu", element: <ProtocolsMenu /> }, // Consistencia en nombres
      { path: "risks-menu", element: <RisksMenu /> }, // Consistencia en nombres
      {
        path: "risks-menu/create-risk-situation",
        element: <CreateRiskSituation />,
      }, // Consistencia en nombres
    ],
    adminLoader,
  },
]);
