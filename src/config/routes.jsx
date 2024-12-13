import { Login } from "../components/screens/login/Login";
import { Admin } from "../components/screens/Admin/Admin";
import { Brigadier } from "../components/screens/Brigadier/Brigadier";
import { User } from "../components/screens/User/User";
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
  BrigadistProtectedRoute,
} from "./protectedRoutes";
import { Structure } from "../components/screens/Structure/Structure";
import Testing from "../components/screens/Testing/Testing";
import { CreateProtocol } from "../components/screens/CreateProtocol/CreateProtocol";
import { Profile } from "../components/screens/Profile/Profile";
import { ProtocolsMenuUser } from "../components/screens/Menu/ProtocolsMenuUser";
import { BrigadierList } from "../components/screens/BrigadireList/BrigadierList";
import UsersList from "../components/screens/UsersList/UsersList";
import { TermsAndConditions } from "../components/screens/TermsAndConditions/TermsAndConditions";
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
    path: "/terms-conditions",
    element: (
      <NotAuthenticatedRoute>
        <TermsAndConditions />
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
      { index: true, element: <Admin /> },
      { path: "report", element: <ReportList /> },
      { path: "meetpoint", element: <MeetPointList /> },
      { path: "menu", element: <Menu /> },
      { path: "usersStatistics", element: <UsersStatus /> }, // Corrección aquí
      { path: "protocols-menu", element: <ProtocolsMenu /> }, // Consistencia en nombres
      { path: "risks-menu", element: <RisksMenu /> }, // Consistencia en nombres
      { path: "structure", element: <Structure /> },
      {
        path: "risks-menu/create-risk-situation",
        element: <CreateRiskSituation />,
      }, // Consistencia en nombres
      {
        path: "risks-menu/protocols-menu/create-protocol",
        element: <CreateProtocol />,
      }, // Consistencia en nombres
      {
        path: "profile",
        element: <Profile />,
      }, // Consistencia en nombres
      {
        path: "users-list", element: <UsersList />,
      }
    ],
  },
  {
    path: "/brigadist",
    element: (
      <BrigadistProtectedRoute>
        <UserLayout />
      </BrigadistProtectedRoute>
    ),
    children: [{ index: true, element: <Brigadier /> },
                {path: "profile",element: <Profile />}, 
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
        <UserLayout />
      </UserProtectedRoute>
    ),
    children: [{ index: true, element: <User /> },
      {
        path: "profile",
        element: <Profile />,
      }, // Consistencia en nombres
      {
        path: "risk/protocols-menu",
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
