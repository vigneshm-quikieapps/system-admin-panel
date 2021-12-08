import { useCallback } from "react";

const useMuiRegister = (register) => {
  const MuiRegister = useCallback(
    (name, options, refName = "inputRef") => {
      const { ref, ...registerMethods } = register(name, options);
      const updatedMethods = { [refName]: ref, ...registerMethods };
      return updatedMethods;
    },
    [register],
  );
  return MuiRegister;
};

export default useMuiRegister;
