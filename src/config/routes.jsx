import { Login } from "../components/screens/login/Login";
import { Admin } from "../components/screens/Admin/Admin";
import { Brigadier } from "../components/screens/Brigadier/Brigadier";
import { User } from "../components/screens/User/User";
import { MeetPointList } from "../components/screens/MeetPointList/MeetPointList";
import { Register } from "../components/screens/register/Register";
import { ReportList } from "../components/screens/ReportList/ReportList";
import { Menu } from "../components/screens/Menu/Menu";
import { Layout } from "../Layouts/LoggedInLayouts/LoggedInLayout";
import { ProtocolsMenu } from "../components/screens/Menu/ProtocolsMenu";
import { RisksMenu } from "../components/screens/Menu/RisksMenu";
import { CreateRiskSituation } from "../components/screens/CreateRiskSituation/CreateRiskSituation";
import UsersStatus from "../components/screens/UsersStatus/UsersStatus";
import { createBrowserRouter } from "react-router-dom";
import {
  AdminProtectedRoute,
  NotAuthenticatedRoute,
  UserProtectedRoute,
  BrigadistProtectedRoute,
} from "./protectedRoutes";
import { Structure } from "../components/screens/Structure/Structure";
import Testing from "../components/screens/Testing/Testing";
import { CreateProtocol } from "../components/screens/CreateProtocol/CreateProtocol";
import { Profile } from "../components/screens/Profile/Profile";
import { ProtocolsMenuUser } from "../components/screens/Menu/ProtocolsMenuUser";
import { BrigadierList } from "../components/screens/BrigadireList/BrigadierList";
import UsersList from "../components/screens/UsersList/UsersList";
import { ShowProtocol } from "../components/screens/ShowProtocol/ShowProtocol";
import { EditProtocol } from "../components/screens/EditProtocol/EditProtocol";
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
    path: "risk-sitiation/:id_risk_situation/show-protocol/:id_protocol",
    element: (
      <>
        <Layout />
        <ShowProtocol />
      </>
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
        <Layout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <Admin /> },
      { path: "report", element: <ReportList /> },
      { path: "meetpoint", element: <MeetPointList /> },
      { path: "menu", element: <Menu /> },
      { path: "usersStatistics", element: <UsersStatus /> }, // Corrección aquí
      { path: "protocols-menu/:id_risk_situation", element: <ProtocolsMenu /> },
      {
        path: "protocols-menu/:id_risk_situation/protocol/:id_protocol/edit",
        element: <EditProtocol />,
      },
      {
        path: "protocols-menu/:id_risk_situation/create-protocol",
        element: <CreateProtocol />,
      },
      { path: "risks-menu", element: <RisksMenu /> }, // Consistencia en nombres
      { path: "structure", element: <Structure /> },
      {
        path: "risks-menu/create-risk-situation",
        element: <CreateRiskSituation />,
      }, // Consistencia en nombres
      {
        path: "profile",
        element: <Profile />,
      }, // Consistencia en nombres
      {
        path: "users-list",
        element: <UsersList />,
      },
    ],
  },
  {
    path: "/brigadist",
    element: (
      <BrigadistProtectedRoute>
        <Layout />
      </BrigadistProtectedRoute>
    ),
    children: [
      { index: true, element: <Brigadier /> },
      { path: "profile", element: <Profile /> },
      {
        path: "risk/protocols-menu",
        element: <ProtocolsMenuUser />,
      }, // Consistencia en nombres
      {
        path: "brigadiers",
        element: <BrigadierList />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <UserProtectedRoute>
        <Layout />
      </UserProtectedRoute>
    ),
    children: [
      { index: true, element: <User /> },
      {
        path: "profile",
        element: <Profile />,
      }, // Consistencia en nombres
      {
        path: "risk-sitiation/:id_risk_situation",
        element: <ProtocolsMenuUser />,
      }, // Consistencia en nombres
      {
        path: "brigadiers",
        element: <BrigadierList />,
      }, // Consistencia en nombres
    ],
  },
  {
    path: "/testing",
    element: <Testing />,
  },
]);
