import axios from "../utils/axios-instance";

export async function updateFinance(
  id,
  bankDetails,
  paymentChannels,
  paymentMethods,
) {
  try {
    const api = `businesses/finances/${id}`;
    const response = await axios.put(
      api,
      bankDetails,
      paymentChannels,
      paymentMethods,
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getDiscount(id) {
  try {
    const api = `businesses/${id}/discounts`;
    const response = await axios.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addDiscount(payload) {
  try {
    const api = `discounts`;
    const response = await axios.post(api, payload);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateOtherInfo(id, payload) {
  try {
    const api = `businesses/${id}/update-other-info`;
    const response = await axios.post(api, payload);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
