import { ListItemButton } from "@mui/material";
import Link from "next/link";
import React from "react";

const ListItemButtonWithRef = React.forwardRef(
  ({ onClick, href, isUrl, children }, ref) => {
    console.log(isUrl, href);
    return (
      <ListItemButton
        sx={{
          width: "100%",
          listStyleType: "none",
          padding: "12px",
          border: "2px solid #F0F0F0",
          borderRadius: "10px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
        ref={ref}
        href={href}
        component={isUrl ? "a" : "a"}
        onClick={onClick}
      >
        {children}
      </ListItemButton>
    );
  }
);
ListItemButtonWithRef.displayName = "ListItemButtonWithRef";
const AppListItemButton = ({ children, onClick, href, isUrl }) => {
  return isUrl ? (
    <Link href={href} passHref>
      <ListItemButtonWithRef isUrl={isUrl} onClick={onClick}>
        {children}
      </ListItemButtonWithRef>
    </Link>
  ) : (
    <ListItemButtonWithRef isUrl={isUrl} onClick={onClick}>
      {children}
    </ListItemButtonWithRef>
  );
};

export default AppListItemButton;
