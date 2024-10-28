import { Login } from "../components/screens/login/login";
import { Main } from "../components/screens/main/Main";
import { MeetPointList } from "../components/screens/MeetPointList/MeetPointList";
import { Register } from "../components/screens/register/Register";
import { ReportList } from "../components/screens/ReportList/ReportList";
//import { CompleteRegister } from "../components/atoms/CompleteRegister";

export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: Register},
    { path: "/main", component:Main},
    { path: "/main/report", component: ReportList},
    { path: "/main/meetpoint", component: MeetPointList},
];
