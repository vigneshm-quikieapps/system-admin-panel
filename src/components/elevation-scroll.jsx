import { cloneElement } from "react";
import { useScrollTrigger } from "@mui/material";

export default function ElevationScroll({ targetRef, children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 65,
    target: targetRef ? targetRef : undefined,
  });

  return cloneElement(children, {
    style: trigger ? { boxShadow: "0 0px 6px #0006" } : {},
  });
}
