// import GeneralLayout from 'layouts/General.jsx';
import UIBSDatatable from "views/general/Tables/BSDatatable.jsx";

import Register from "../views/general/Forms/Register";
import Login from "../views/general/Forms/Login";
import Home from "../views/general/Forms/home";

var indexRoutes = [
  { path: "/register", name: "Register", icon: "note", component: Register },
  { path: "/login", name: "Login", icon: "key", component: Login },
  // { path: "/market", name: "Market",icon:"chart", component: UIBSDatatable },
  { path: "/home", name: "Home", icon: "screen-desktop", component: Home },
  { redirect: true, path: "/", pathTo: "/home", name: "home" },
];

export default indexRoutes;
