import { useQuery } from "react-query";

import { axios } from "../utils";

const buildQueryHook = (queryName, path) => {
  const fetchList = (page = 1, filters = []) =>
    axios.get(path, { params: { page, filters } }).then((res) => res.data);
  return (page, filters) => {
    const queryState = useQuery(
      [queryName, page, filters],
      () => fetchList(page, filters),
      {
        keepPreviousData: true,
      },
    );
    return queryState;
  };
};

export const useBusinessListQuery = buildQueryHook(
  "businessList",
  "businesses",
);

export const useEvaluationSchemesQuery = buildQueryHook(
  "evaluationList",
  "evaluations",
);
export const useRoleListQuery = buildQueryHook("roleList", "roles");
export const useUserListQuery = buildQueryHook("userList", "users");
