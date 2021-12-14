import { Routes, Route } from "react-router-dom";
import { UserList, UserAddEdit, UserInfo, NotFound } from "..";

const Users = () => (
  <Routes>
    <Route index element={<UserList />} />
    <Route path="details/:id" element={<UserInfo />} />
    <Route path="add/:id" element={<UserAddEdit />} />
    <Route path="add" element={<UserAddEdit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Users;
