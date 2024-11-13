import { Login } from "../components/screens/login/Login";
import { Main } from "../components/screens/main/Main";
import { MeetPointList } from "../components/screens/MeetPointList/MeetPointList";
import { Register } from "../components/screens/register/Register";
import { ReportList } from "../components/screens/ReportList/ReportList";
import { Menu } from "../components/screens/Menu/Menu";
import { LoggedInLayout } from "../Layouts/LoggedInLayout/LoggedInLayout";
import { ProtocolsMenu } from "../components/screens/Menu/ProtocolsMenu";
import { RisksMenu } from "../components/screens/Menu/RisksMenu";
import { CreateRiskSituation } from "../components/screens/CreateRiskSituation/CreateRiskSituation";
import UsersStatus from "../components/screens/UsersStatus/UsersStatus";


export const GeneralRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
];

export const AdminRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/main/report", component: ReportList },
  { path: "/main/meetpoint", component: MeetPointList },
  { path: "/usersStadistics", component: UsersStatus, Layout: LoggedInLayout },
  { path: "/main", component: Main, Layout: LoggedInLayout },
  { path: "/menu", component: Menu, Layout: LoggedInLayout },
  { path: "/ProtocolsMenu", component: ProtocolsMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu", component: RisksMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu/createRiskSituation", component: CreateRiskSituation },
];

export const BrigadistRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/main/report", component: ReportList },
  { path: "/main/meetpoint", component: MeetPointList },
  { path: "/usersStadistics", component: UsersStatus, Layout: LoggedInLayout },
  { path: "/main", component: Main, Layout: LoggedInLayout },
  { path: "/menu", component: Menu, Layout: LoggedInLayout },
  { path: "/ProtocolsMenu", component: ProtocolsMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu", component: RisksMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu/createRiskSituation", component: CreateRiskSituation },
];

export const UserRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/main/report", component: ReportList },
  { path: "/main/meetpoint", component: MeetPointList },
  { path: "/usersStadistics", component: UsersStatus, Layout: LoggedInLayout },
  { path: "/main", component: Main, Layout: LoggedInLayout },
  { path: "/menu", component: Menu, Layout: LoggedInLayout },
  { path: "/ProtocolsMenu", component: ProtocolsMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu", component: RisksMenu, Layout: LoggedInLayout },
  { path: "/RisksMenu/createRiskSituation", component: CreateRiskSituation },
];

