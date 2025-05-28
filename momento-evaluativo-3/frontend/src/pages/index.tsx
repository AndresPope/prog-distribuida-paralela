import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
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


export const MedicinesList = () => {

  const { loading, error, data } = useQuery<ListMedicinesGql>(LIST_MEDICINES);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  const medicines = data.listAllMedicines;

  return (
    <>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant={"h6"}>Medicamentos</Typography>
        <AddMedicine />
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#0088d1" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Identificador</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Laboratorio</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cantidad</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha de Expiración</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha de ingreso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines.map((med, index) => (
            <TableRow key={index}>
              <TableCell>{med.id}</TableCell>
              <TableCell>{med.name}</TableCell>
              <TableCell>{med.kind}</TableCell>
              <TableCell>{med.laboratory}</TableCell>
              <TableCell>{med.quantity}</TableCell>
              <TableCell>{format(med.expirationDate, "dd/MM/yyyy")}</TableCell>
              <TableCell>{format(med.registrationDate, "dd/MM/yyyy")}</TableCell>
              <TableCell><UpdateMedicine medicine={med} /></TableCell>
              <TableCell>
                <DeleteMedicine medId={med.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};