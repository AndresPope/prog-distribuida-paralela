import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Outlet, useLocation, useNavigate } from "react-router";


export const Layout = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isRoot = pathname === "/";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
    }}>
      <Paper elevation={4} sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        m: 4,
        width: "50vw",
      }}>
        <Stack direction="row" spacing={2} justifyItems="center">
          {!isRoot && (
            <IconButton onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>)}
          <Typography variant={"h4"}>Secretaria de movilidad</Typography>
        </Stack>
        <Outlet />
      </Paper>
    </Box>
  );
};