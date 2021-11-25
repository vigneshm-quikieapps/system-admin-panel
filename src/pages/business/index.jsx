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

const Page = () => (
  <Routes>
    <Route element={<TopNav />}>
      <Route path="add/:id" element={<BusinessAddEdit />} />
      <Route path="finance-info" element={<BusinessFinance />} />
      <Route path="details" element={<BusinessInfo />} />
      <Route path="other-info" element={<BusinessOtherInfo />} />
      <Route path="add-finance/:id" element={<BusinessAddEditFinance />} />
      <Route path="add-finance" element={<BusinessAddEditFinance />} />
    </Route>
    <Route path="add" element={<BusinessAddEdit />} />
    <Route index element={<BusinessList />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Page;
