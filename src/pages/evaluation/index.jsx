import { Routes, Route } from "react-router-dom";

import {
  EvaluationList,
  EvaluationInfo,
  EvaluationAddEdit,
  NotFound,
} from "..";

const Page = () => (
  <Routes>
    <Route index element={<EvaluationList />} />
    <Route path="details/:id" element={<EvaluationInfo />} />
    <Route path="add/:id" element={<EvaluationAddEdit />} />
    <Route path="add" element={<EvaluationAddEdit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Page;
