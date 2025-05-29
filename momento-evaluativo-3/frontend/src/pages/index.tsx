import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingScreen } from "../components/loading.tsx";
import { useQuery } from "@apollo/client";
import { LIST_MEDICINES } from "../gql";
import { ListMedicinesGql } from "../types";
import { format } from "date-fns";
import { AddMedicine } from "../components/add-medicine.tsx";
import { UpdateMedicine } from "../components/update-medicine.tsx";
import { DeleteMedicine } from "../components/delete-medicine.tsx";
import { useNavigate } from "react-router";
import { Assessment } from "@mui/icons-material";


export const MedicinesList = () => {

  const navigate = useNavigate();
  const { loading, error, data } = useQuery<ListMedicinesGql>(LIST_MEDICINES);

  const navigateToReport = () => {
    navigate("/xml");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  const medicines = data.listAllMedicines;

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      pt: { xs: 2, md: 4 },
      px: { xs: 1, sm: 2, md: 3 },
    }}>
      <Box sx={{
        maxWidth: "1400px",
        mx: "auto",
        mt: { xs: "3rem", md: "5rem" },
      }}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Typography
              variant={"h4"}
              color="primary"
              fontWeight="bold"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              💊 Medicamentos
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <AddMedicine />
              <Button
                onClick={navigateToReport}
                variant="outlined"
                startIcon={<Assessment />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                  },
                }}
              >
                Ir a Reporte XML
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: "70vh",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Laboratorio
                </TableCell>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Cantidad
                </TableCell>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Expiración
                </TableCell>
                <TableCell
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    textAlign: "center",
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((med, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                      transform: "scale(1.001)",
                      transition: "all 0.2s ease-in-out",
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "medium", color: "primary.main" }}>
                    {med.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", maxWidth: 150 }}>
                    <Typography variant="body2" noWrap title={med.name}>
                      {med.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }}>
                    <Typography variant="body2" noWrap title={med.laboratory}>
                      {med.laboratory}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={med.quantity}
                      size="small"
                      color={med.quantity > 10 ? "success" : "warning"}
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={format(med.expirationDate, "dd/MM/yyyy")}
                      size="small"
                      sx={{ fontWeight: "medium" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={0.5} justifyContent="center">
                      <UpdateMedicine medicine={med} />
                      <DeleteMedicine medId={med.id} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
};