import { useMutation } from "react-query";

import axios from "../utils/axios-instance";
import { queryClient } from "../App.jsx";

const postBusiness = (businessData) => axios.post("businesses", businessData);
const putBusiness = (businessData) =>
  axios.put(`businesses/${businessData._id}`, businessData);
const deleteBusiness = (businessId) => axios.delete(`businesses/${businessId}`);

export const usePostBusiness = (options) =>
  useMutation((businessDate) => postBusiness(businessDate), options);

export const usePutBusiness = (options) =>
  useMutation((businessData) => putBusiness(businessData), options);

export const useDeleteBusiness = () =>
  useMutation((businessId) => deleteBusiness(businessId), {
    onSuccess: () => {
      queryClient.invalidateQueries("businessList");
    },
  });

const postRole = (roleData) => axios.post("roles", roleData);
const putRole = (roleData) => axios.put(`roles/${roleData._id}`, roleData);
const deleteRole = (roleId) => axios.delete(`roles/${roleId}`);

export const usePostRole = (options) =>
  useMutation((roleDate) => postRole(roleDate), options);

export const usePutRole = (options) =>
  useMutation((roleData) => putRole(roleData), options);

export const useDeleteRole = () =>
  useMutation((roleId) => deleteRole(roleId), {
    onSuccess: () => {
      queryClient.invalidateQueries("roleList");
    },
  });

const postUser = (userData) => axios.post("users", userData);
const putUser = (userData) => axios.put(`users/${userData._id}`, userData);
const deleteUser = (userId) => axios.delete(`users/${userId}`);

export const usePostUser = (options) =>
  useMutation((UserData) => postUser(UserData), options);

export const usePutUser = (options) =>
  useMutation((userData) => putUser(userData), options);

export const useDeleteUser = () =>
  useMutation((userId) => deleteUser(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries("userList");
    },
  });

const deleteEvaluationScheme = (schemeId) =>
  axios.delete(`evaluations/${schemeId}`);

export const useDeleteEvaluationScheme = () =>
  useMutation((schemeId) => deleteEvaluationScheme(schemeId), {
    onSuccess: () => {
      queryClient.invalidateQueries("evaluationList");
    },
  });
