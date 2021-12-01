import { Routes, Route } from "react-router-dom";
import UserList from "./list";

const Users = () => (
  <Routes>
    <Route index element={<UserList />} />
  </Routes>
);

export default Users;
