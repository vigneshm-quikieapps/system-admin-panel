import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ErrorBoundary from "../hoc/error-boundary";
import {
  Dashboard,
  Business,
  Evaluation,
  Login,
  NotFound,
  Roles,
  Users,
} from "../pages";

import MainLayout from "../hoc/main-layout";

const MainRouter = () => (
  <BrowserRouter>
    {/* /// enable it for production */}
    {/* <ErrorBoundary> */}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="business/*" element={<Business />} />
        <Route path="evaluation/*" element={<Evaluation />} />
        <Route path="roles/*" element={<Roles />} />
        <Route path="users/*" element={<Users />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    {/* </ErrorBoundary> */}
  </BrowserRouter>
);

export default MainRouter;
