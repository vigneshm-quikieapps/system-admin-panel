import { useQuery } from "react-query";

import axios from "../utils/axios-instance";

const fetchBusiness = (id) =>
  axios.get(`businesses/${id}`).then(({ data }) => data);

export const useGetBusiness = (id, options) =>
  useQuery(["business", id], () => fetchBusiness(id), {
    enabled: !!id,
    ...options,
  });

const fetchRole = (id) => axios.get(`roles/${id}`).then(({ data }) => data);

export const useGetRole = (id, options) =>
  useQuery(["role", id], () => fetchRole(id), {
    enabled: !!id,
    ...options,
  });
