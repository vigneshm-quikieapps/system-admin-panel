import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = forwardRef(
  ({ activeClassName, className, ...props }, ref) => (
    <NavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        isActive ? className + " " + activeClassName : className
      }
    />
  ),
);

export default CustomNavLink;
