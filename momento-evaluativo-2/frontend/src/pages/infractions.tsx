import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "../components/loading.tsx";
import { getInfractionType } from "../functions";
import { listInfractionsByOwner } from "../api";


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


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Matricula</TableCell>
          <TableCell>Tipo de Infracción</TableCell>
          <TableCell>Fecha</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((infraction, index) => (
          <TableRow key={index}>
            <TableCell>{infraction.vehicle.plate}</TableCell>
            <TableCell>{getInfractionType(infraction.detectionType)}</TableCell>
            <TableCell>{new Date(infraction.date).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};