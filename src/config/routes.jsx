import { Layout } from "antd";
import { Login } from "../components/screens/login/login";
import { Main } from "../components/screens/main/Main";
import { Menu } from "../components/screens/Menu/Menu";
import { Register } from "../components/screens/register/Register";
import { LoggedInLayout } from "../Layouts/LoggedInLayout/LoggedInLayout";
/* import {Spinner} from "../components/atoms/Spinner/Spinner";  */
//import { CompleteRegister } from "../components/atoms/CompleteRegister";
export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: Register},
    { path: "/main", component:Main, Layout: LoggedInLayout},
    { path:"/menu", component: Menu, Layout: LoggedInLayout}
];
