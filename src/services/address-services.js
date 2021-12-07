import axios from "axios";
import { useQuery } from "react-query";

const fetchAddress = (postcode) =>
  axios
    .get(
      `https://ws.postcoder.com/pcw/${process.env.REACT_APP_POSTCODER_API_KEY}/address/uk/${postcode}?format=json&lines=2&addtags=latitude,longitude,country`,
    )
    .then(({ data }) => data);

export const useAddressQuery = (postcode) => {
  return useQuery("address", () => fetchAddress(postcode), { enabled: false });
};
