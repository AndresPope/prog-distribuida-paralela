import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "../components/loading.tsx";
import { getInfractionType } from "../functions";
import { listInfractionsByOwner } from "../api";
import { AddInfraction } from "../components/add-infraction.tsx";
import { DeleteInfraction } from "../components/delete-infraction.tsx";

export const InfractionsList = () => {

  const { state } = useLocation();

  const ownerId = state?.ownerId as string;

  const { isLoading, error, data } = useQuery({
    queryKey: ["infractions", ownerId],
    queryFn: () => listInfractionsByOwner(ownerId),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  if (data.length === 0) {
    return <Typography variant={"h6"}>No hay infracciones</Typography>;
  }


  return (
    <>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant={"h6"}>Infracciones</Typography>
        <AddInfraction ownerId={ownerId} />
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#0088d1" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Matricula</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo de Infracción</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((infraction, index) => (
            <TableRow key={index}>
              <TableCell>{infraction.vehicle.plate}</TableCell>
              <TableCell>{getInfractionType(infraction.detectionType)}</TableCell>
              <TableCell>{new Date(infraction.date).toLocaleString()}</TableCell>
              <TableCell>
                <DeleteInfraction ownerId={ownerId} infractionId={infraction.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};