import { Login } from "../components/screens/login/login";
import { Main } from "../components/screens/main/Main";
import { Register } from "../components/screens/register/Register";

export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: Register},
    { path: "/main", component:Main}
];
