import axios from "../utils/axios-instance";
import { useMutation } from "react-query";

const postBusiness = (businessData) => axios.post("businesses", businessData);

export const usePostBusiness = () =>
  useMutation((newBusiness) => postBusiness(newBusiness));
