import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { LoadingScreen } from "../components/loading.tsx";
import { getVehicleType } from "../functions";
import { useLocation } from "react-router";
import { AddVehicle } from "../components/add-vehicle.tsx";
import { DeleteVehicle } from "../components/delete-vehicle.tsx";
import { useQuery } from "@apollo/client";
import { ListOwnerVehiclesGql } from "../types";
import { LIST_OWNER_VEHICLES } from "../gql";

export const VehiclesList = () => {

  const { state } = useLocation();

  const ownerId = state?.ownerId as string;

  const { loading, error, data } = useQuery<ListOwnerVehiclesGql>(LIST_OWNER_VEHICLES, {
    variables: {
      ownerId,
    },
  });

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  const vehicles = data.listAllOwnerVehicles;

  if (vehicles.length === 0) {
    return (
      <Stack>
        <Typography variant={"h6"}>No hay Vehiculos Registrados</Typography>
        <AddVehicle ownerId={ownerId} />
      </Stack>
    );
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
          <TableRow sx={{ background: "#0088d1" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Marca</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Matricula</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo de vehiculo</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha de Registro</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle, index) => (
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