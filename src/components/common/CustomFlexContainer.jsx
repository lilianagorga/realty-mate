import React from "react";
import { Box } from "@chakra-ui/react";

export const CustomFlexContainer = ({
  children,
  justifyContent = "space-between",
  alignItems = "center",
  p = "0",
  borderRadius = "0",
  border = "none",
  color = "inital",
  cursor = "auto",
  fontWeight = "normal",
  marginTop = "0",
  direction = "row",
}) => {
  return (
    <Box
      display="flex"
      justifyContent={justifyContent}
      alignItems={alignItems}
      p={p}
      borderRadius={borderRadius}
      border={border}
      color={color}
      cursor={cursor}
      fontWeight={fontWeight}
      marginTop={marginTop}
      flexDirection={direction}
    >
      {children}
    </Box>
  );
};
