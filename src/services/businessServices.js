import axios from "../utils/axios-instance";

export async function updateFinance(
  id,
  bankDetails,
  paymentChannels,
  paymentMethods,
) {
  try {
    const api = `businesses/finances/${id}`;
    console.log(id, bankDetails, paymentChannels, paymentMethods);
    const response = await axios.put(
      api,
      bankDetails,
      paymentChannels,
      paymentMethods,
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
