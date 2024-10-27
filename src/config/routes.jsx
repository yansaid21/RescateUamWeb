import { Layout } from "antd";
import { Login } from "../components/screens/login/login";
import { Main } from "../components/screens/main/Main";
import { Menu } from "../components/screens/Menu/Menu";
import { Register } from "../components/screens/register/Register";
import { LoggedInLayout } from "../Layouts/LoggedInLayout/LoggedInLayout";
import { ProtocolsMenu } from "../components/screens/Menu/ProtocolsMenu";
import { RisksMenu } from "../components/screens/Menu/RisksMenu";
/* import {Spinner} from "../components/atoms/Spinner/Spinner";  */
//import { CompleteRegister } from "../components/atoms/CompleteRegister";
export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: Register},
    { path: "/main", component:Main, Layout: LoggedInLayout},
    { path:"/menu", component: Menu, Layout: LoggedInLayout},
    { path: "/ProtocolsMenu", component: ProtocolsMenu, Layout: LoggedInLayout},
    { path: "/RisksMenu", component: RisksMenu, Layout: LoggedInLayout}

];
