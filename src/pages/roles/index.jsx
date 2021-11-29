import { Routes, Route } from "react-router-dom";

import { RoleList, RoleInfo, RoleAddEdit, NotFound } from "..";

const Roles = () => (
  <Routes>
    <Route index element={<RoleList />} />
    <Route path="details/:id" element={<RoleInfo />} />
    <Route path="add/:id" element={<RoleAddEdit />} />
    <Route path="add" element={<RoleAddEdit />} />
    <Route index element={<RoleList />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Roles;
