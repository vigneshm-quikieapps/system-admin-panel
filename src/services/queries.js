import { useQuery } from "react-query";

import axios from "../utils/axios-instance";

const fetchBusiness = (id) =>
  axios.get(`businesses/${id}`).then(({ data }) => data);
export const useGetBusiness = (id, options) =>
  useQuery(["business", id], () => fetchBusiness(id), {
    enabled: !!id,
    ...options,
  });

const fetchBusinessFinance = (id) =>
  axios.get(`businesses/${id}/finance`).then(({ data }) => data);
export const useGetBusinessFinance = (id, options) =>
  useQuery(["businessFinance", id], () => fetchBusinessFinance(id), {
    enabled: !!id,
    ...options,
  });

const fetchRole = (id) => axios.get(`roles/${id}`).then(({ data }) => data);
export const useGetRole = (id, options) =>
  useQuery(["role", id], () => fetchRole(id), {
    enabled: !!id,
    ...options,
  });

const fetchUser = (id) => axios.get(`users/${id}`).then(({ data }) => data);
export const useGetUser = (id, options) =>
  useQuery(["user", id], () => fetchUser(id), {
    enabled: !!id,
    ...options,
  });
const fetchEvaluation = (id) =>
  axios.get(`evaluations/${id}`).then(({ data }) => data);
export const useGetEvaluation = (id, options) =>
  useQuery(["evaluation", id], () => fetchEvaluation(id), {
    enabled: !!id,
    ...options,
  });
