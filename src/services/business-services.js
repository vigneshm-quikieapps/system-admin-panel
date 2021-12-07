import { useQuery } from "react-query";

import { axios } from "../utils";

const fetchBusinessInfo = (id) => {
  return axios.get(`businesses/${id}`).then((response) => response.data);
};
export const useBusinessInfoQuery = (id) => {
  return useQuery("getBusiness", () => fetchBusinessInfo(id));
};
