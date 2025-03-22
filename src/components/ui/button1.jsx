import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import "./components.css";

const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonClasses = [
      "button",
      `button--${variant}`,
      `button--${size}`,
      className
    ].filter(Boolean).join(" ");

    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

