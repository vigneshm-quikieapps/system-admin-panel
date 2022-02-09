import axios from "../utils/axios-instance";

export async function updateFinance(id, payload) {
  try {
    const api = `businesses/finances/${id}`;
    const response = await axios.put(api, payload);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
