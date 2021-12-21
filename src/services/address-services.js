import axios from "../utils/axios-instance";
import { useQuery } from "react-query";

const fetchAddress = (postcode, countryCode = "UK") =>
  axios.post("/address", { postcode, countryCode }).then(({ data }) => data);

export const useAddressQuery = (postcode, countryCode) => {
  return useQuery("address", () => fetchAddress(postcode, countryCode), {
    enabled: false,
  });
};
