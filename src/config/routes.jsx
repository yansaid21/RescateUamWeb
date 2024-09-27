import { Login } from "../components/screens/login/login";
import { register } from "../components/screens/register/register";

export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: register},
];
