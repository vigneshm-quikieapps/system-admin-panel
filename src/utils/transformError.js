const transformError = (error, customMessage = "Error") => {
  error = error?.response?.data;
  let message = error?.message || customMessage;
  let errors = error?.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    message = errors.reduce((prev, errorItem) => {
      if (typeof errorItem === "string") return (prev += errorItem + "\n");
      const errorEntries = Object.entries(errorItem);
      const errorMessages = errorEntries.map((entry) => entry.join(": "));
      return (prev += errorMessages.join("\n") + "\n");
    }, "");
  }
  return message;
};

export const transformErrorsToArray = (error, customMessage = "Error") => {
  if (!error) return [];
  if (typeof error === "string") return [error];
  let errorArray = [];
  error = error?.response?.data || error;
  let errors = error?.errors || error;
  if (!Array.isArray(errors)) {
    if (error?.message && typeof error.message === "string")
      return [error.message];
    return [customMessage];
  }
  errors.forEach((errorItem) => {
    if (typeof errorItem === "string") errorArray.push(errorItem);
    if (typeof errorItem === "object") {
      const errorEntries = Object.entries(errorItem);
      errorEntries.forEach((entry) => {
        if (typeof entry[1] === "string") errorArray.push(entry.join(": "));
      });
    }
  });
  return errorArray;
};

export default transformError;
