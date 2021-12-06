const useMuiRegister = (register) => {
  const MuiRegister = (name, options, refName = "inputRef") => {
    const { ref, ...registerMethods } = register(name, options);
    const updatedMethods = { [refName]: ref, ...registerMethods };
    return updatedMethods;
  };
  return MuiRegister;
};

export default useMuiRegister;
