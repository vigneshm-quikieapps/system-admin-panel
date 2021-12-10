import axios from "../utils/axios-instance";
import { useMutation } from "react-query";

const postBusiness = (businessData) => axios.post("businesses", businessData);
const putBusiness = (businessData) =>
  axios.put(`businesses/${businessData._id}`, businessData);

export const usePostBusiness = (options) =>
  useMutation((businessDate) => postBusiness(businessDate), options);

export const usePutBusiness = (options) =>
  useMutation((businessData) => putBusiness(businessData), options);

const postRole = (roleData) => axios.post("roles", roleData);
const putRole = (roleData) => axios.put(`roles/${roleData._id}`, roleData);

export const usePostRole = (options) =>
  useMutation((roleDate) => postRole(roleDate), options);

export const usePutRole = (options) =>
  useMutation((roleData) => putRole(roleData), options);
