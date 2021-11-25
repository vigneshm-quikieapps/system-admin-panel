import { ImgIcon } from "../components";
import { dashboardIcon, memberIcon } from "../assets/icons";

export const navItems = [
  {
    id: "1",
    title: "Dash Board",
    urlPath: "/",
    exact: true,
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "2",
    title: "Business",
    urlPath: "business",
    exact: false,
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "3",
    title: "Evaluation",
    urlPath: "evaluation",
    exact: false,
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "4",
    title: "Role",
    urlPath: "roles",
    exact: false,
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "5",
    title: "User Search",
    urlPath: "users",
    exact: false,
    icon: <ImgIcon>{memberIcon}</ImgIcon>,
  },
];
