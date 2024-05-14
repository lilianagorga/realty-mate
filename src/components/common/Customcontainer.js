import { Box } from "@chakra-ui/react";

export const CustomContainer = ({
  children,
  maxW = { base: "90%", md: "80%" },
  mx = "auto",
  p = "0",
  color = "initial",
  textAlign = "center",
  ...props
}) => {
  return (
    <Box
      maxW={maxW}
      mx={mx}
      p={p}
      color={color}
      textAlign={textAlign}
      {...props}
    >
      {children}
    </Box>
  );
};
