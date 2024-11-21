import { Login } from "../components/screens/login/Login";
import { Main } from "../components/screens/main/Main";
import { MeetPointList } from "../components/screens/MeetPointList/MeetPointList";
import { Register } from "../components/screens/register/Register";
import { ReportList } from "../components/screens/ReportList/ReportList";
import { Menu } from "../components/screens/Menu/Menu";
import {
  AdminLayout,
  UserLayout,
} from "../Layouts/LoggedInLayouts/LoggedInLayout";
import { ProtocolsMenu } from "../components/screens/Menu/ProtocolsMenu";
import { RisksMenu } from "../components/screens/Menu/RisksMenu";
import { CreateRiskSituation } from "../components/screens/CreateRiskSituation/CreateRiskSituation";
import UsersStatus from "../components/screens/UsersStatus/UsersStatus";
import { createBrowserRouter } from "react-router-dom";
import {
  AdminProtectedRoute,
  NotAuthenticatedRoute,
  UserProtectedRoute,
} from "./protectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NotAuthenticatedRoute>
        <Login />
      </NotAuthenticatedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <NotAuthenticatedRoute>
        <Register />
      </NotAuthenticatedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
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
  },
  {
    path: "/user",
    element: (
      <UserProtectedRoute>
        <UserLayout />
      </UserProtectedRoute>
    ),
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
  },
]);
