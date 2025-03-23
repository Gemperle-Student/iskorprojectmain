import * as React from "react";
import "./components.css";

const Input = React.forwardRef(({ className = "", type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`input ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
