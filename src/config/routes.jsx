import { Login } from "../components/screens/login/login";
import { Main } from "../components/screens/main/Main";
import { Register } from "../components/screens/register/Register";
//import { CompleteRegister } from "../components/atoms/CompleteRegister";

export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: Register},
    { path: "/main", component:Main}
];
