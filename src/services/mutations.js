import axios from "../utils/axios-instance";
import { useMutation } from "react-query";

const postBusiness = (businessData) => axios.post("businesses", businessData);
const putBusiness = (businessData) =>
  axios.put(`businesses/${businessData._id}`, businessData);

export const usePostBusiness = (options) =>
  useMutation((businessDate) => postBusiness(businessDate), options);

export const usePutBusiness = (options) =>
  useMutation((businessData) => putBusiness(businessData), options);
