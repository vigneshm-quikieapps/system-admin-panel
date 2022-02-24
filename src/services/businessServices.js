import id from "date-fns/locale/id/index.js";
import axios from "../utils/axios-instance";

export async function updateFinance(id, payload) {
  try {
    const api = `businesses/finances/${id}`;
    const response = await axios.put(api, payload);
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

export async function getDiscount(id) {
  try {
    const api = `businesses/${id}/discounts`;
    const response = await axios.get(api);
    return response.data.discounts;
  } catch (error) {
    throw error;
  }
}
export async function addDiscount(payload) {
  try {
    const api = `discounts`;
    const response = await axios.post(api, payload);

    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateDiscount(id, payload) {
  try {
    const api = `discounts/${id}`;
    const response = await axios.put(api, payload);

    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteDiscount(id) {
  try {
    const api = `discounts/${id}`;
    const response = await axios.delete(api);

    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateOtherInfo(
  id,
  facebookUrl,
  instagramUrl,
  pinterestUrl,
  linkedinUrl,
  oldImagesLinks,
  oldLogoLinks,
  newImages,
  newLogos,
) {
  // const {
  //   facebookUrl,
  //   instagramUrl,
  //   pinterestUrl,
  //   linkedinUrl,
  //   oldImagesLinks,
  //   oldLogoLinks,
  //   newImages,
  //   newLogos,
  // } = payload;
  const data = new FormData();
  data.append("facebookUrl", facebookUrl);
  data.append("instagramUrl", instagramUrl);
  data.append("pinterestUrl", pinterestUrl);
  data.append("linkedinUrl", linkedinUrl);
  data.append("oldImagesLinks", oldImagesLinks);
  data.append("oldLogoLinks", oldLogoLinks);
  // data.append("newImages", newImages);
  // data.append("newLogos", newLogos);
  // data.append("newImages", []);
  // data.append("newLogos", []);
  newImages.forEach((item) => data.append(`newImages`, item));
  newLogos.forEach((item) => data.append(`newLogos`, item));

  console.log("other", data.getAll("newLogos"), data.getAll("newImages"));
  try {
    const api = `businesses/${id}/update-other-info`;
    const response = await axios.post(
      api,
      data,
      //   {
      //   facebookUrl,
      //   instagramUrl,
      //   pinterestUrl,
      //   linkedinUrl,
      //   oldImagesLinks,
      //   oldLogoLinks,
      //   newImages,
      //   newLogos,
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateEvaluation(id, payload) {
  try {
    const api = `/evaluations/${id}`;
    const response = await axios.put(api, payload);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function createEvaluation(payload) {
  try {
    const api = `/evaluations`;
    const response = await axios.post(api, payload);

    return response;
  } catch (error) {
    throw error;
  }
}
