import { Box, CircularProgress } from "@mui/material";


export const LoadingScreen = () => {
  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CircularProgress size={"10%"} />
    </Box>
  );
};