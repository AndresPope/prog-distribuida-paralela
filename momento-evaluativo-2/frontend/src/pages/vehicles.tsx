import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "../components/loading.tsx";
import { getVehicleType } from "../functions";
import { useLocation } from "react-router";
import { listVehiclesByOwner } from "../api";
import { AddVehicle } from "../components/add-vehicle.tsx";
import { DeleteVehicle } from "../components/delete-vehicle.tsx";


export const VehiclesList = () => {

  const { state } = useLocation();

  const ownerId = state?.ownerId as string;

  const { isLoading, error, data } = useQuery({
    queryKey: ["vehicles", ownerId],
    queryFn: () => listVehiclesByOwner(ownerId),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }


  return (
    <>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant={"h6"}>Vehiculos</Typography>
        <AddVehicle ownerId={ownerId} />
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Matricula</TableCell>
            <TableCell>Tipo de vehiculo</TableCell>
            <TableCell>Fecha de Registro</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((vehicle, index) => (
            <TableRow key={index}>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.plate}</TableCell>
              <TableCell>{getVehicleType(vehicle.type)}</TableCell>
              <TableCell>{new Date(vehicle.registrationDate).toLocaleString()}</TableCell>
              <TableCell>
                <DeleteVehicle vehicleId={vehicle.id} ownerId={ownerId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

};