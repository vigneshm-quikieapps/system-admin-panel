import { useRef, useEffect } from "react";

const usePrevious = (state) => {
  const value = useRef(state);

  useEffect(() => (value.current = state), [state]);

  return value.current;
};

export default usePrevious;
