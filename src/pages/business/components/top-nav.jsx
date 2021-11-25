import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import TabNav from "../../../components/tabular-navigation";

const TopNav = () => {
  const { id: businessId = "" } = useParams();
  const pathTo = (path) => path + "/" + businessId;

  const items = [
    {
      id: 1,
      title: "Basic Info",
      to: pathTo("details"),
      exact: false,
    },
    {
      id: 2,
      title: "Finance Info",
      to: pathTo("finance-info"),
      exact: false,
    },
    {
      id: 3,
      title: "Other Info",
      to: pathTo("other-info"),
      exact: false,
    },
  ];
  return (
    <>
      <TabNav items={items} />
      <Outlet />
    </>
  );
};

export default TopNav;
