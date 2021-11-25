import { useMemo } from "react";

const useDefaultDate = () => {
  const defaultTime = useMemo(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  }, []);

  return defaultTime;
};

export default useDefaultDate;
