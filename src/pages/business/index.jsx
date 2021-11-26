import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  BusinessAddEdit,
  BusinessAddEditFinance,
  BusinessFinance,
  BusinessInfo,
  BusinessList,
  BusinessOtherInfo,
  NotFound,
} from "../index";
import TopNav from "./components/top-nav";

const Page = () => {
  const [pageTitle, setPageTitle] = useState("Basic Info");
  return (
    <Routes>
      <Route element={<TopNav pageTitle={pageTitle} />}>
        <Route path="add/:id" element={<BusinessAddEdit />} />
        <Route
          path="finance-info/:id"
          element={<BusinessFinance setPageTitle={setPageTitle} />}
        />
        <Route
          path="details/:id"
          element={<BusinessInfo setPageTitle={setPageTitle} />}
        />
        <Route
          path="other-info/:id"
          element={<BusinessOtherInfo setPageTitle={setPageTitle} />}
        />
        <Route path="add-finance/:id" element={<BusinessAddEditFinance />} />
        <Route path="add-finance/:id" element={<BusinessAddEditFinance />} />
      </Route>
      <Route path="add" element={<BusinessAddEdit />} />
      <Route index element={<BusinessList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Page;
