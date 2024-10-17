import { Login } from "../components/screens/login/login";
import { register } from "../components/screens/register/register";
//import { CompleteRegister } from "../components/atoms/CompleteRegister";

export const GeneralRoutes = [
    { path: "/", component: Login},
    { path: "/register", component: register}
];
