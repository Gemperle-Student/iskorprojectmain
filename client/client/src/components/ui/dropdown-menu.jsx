import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";
import "./components.css";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef(
  ({ className = "", inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={`dropdown-menu-sub-trigger ${inset ? "data-inset" : ""} ${className}`}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  ),
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={`dropdown-menu-sub-content ${className}`}
      {...props}
    />
  ),
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef(
  ({ className = "", sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={`dropdown-menu-content ${className}`}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  ),
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(
  ({ className = "", inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={`dropdown-menu-item ${inset ? "data-inset" : ""} ${className}`}
      {...props}
    />
  ),
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className = "", children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={`dropdown-menu-checkbox-item ${className}`}
      checked={checked}
      {...props}
    >
      <span className="checkbox-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={`dropdown-menu-radio-item ${className}`}
      {...props}
    >
      <span className="radio-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef(
  ({ className = "", inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`dropdown-menu-label ${inset ? "data-inset" : ""} ${className}`}
      {...props}
    />
  ),
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`dropdown-menu-separator ${className}`}
      {...props}
    />
  ),
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className = "", ...props }) => {
  return (
    <span
      className={`dropdown-menu-shortcut ${className}`}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
