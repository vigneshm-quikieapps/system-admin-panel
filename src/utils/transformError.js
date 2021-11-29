const transformError = (error, customMessage = "Something went wrong!") => {
  console.log(error);
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

export default transformError;
