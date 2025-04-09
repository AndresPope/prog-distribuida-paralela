import { Box, CircularProgress } from "@mui/material";


export const LoadingScreen = () => {
  return (
    <Box sx={{
      w: "100%",
      h: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CircularProgress size={"50%"} />
    </Box>
  );
};