import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { LoadingScreen } from "../components/loading.tsx";
import { getInfractionType } from "../functions";
import { AddInfraction } from "../components/add-infraction.tsx";
import { DeleteInfraction } from "../components/delete-infraction.tsx";
import { useQuery } from "@apollo/client";
import { LIST_OWNER_INFRACTIONS } from "../gql";
import { ListOwnerInfractionsGql } from "../types";

export const InfractionsList = () => {

  const { state } = useLocation();

  const ownerId = state?.ownerId as string;

  const { loading, error, data } = useQuery<ListOwnerInfractionsGql>(LIST_OWNER_INFRACTIONS, {
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

  const infractions = data.listAllOwnerInfractions;

  if (infractions.length === 0) {
    return (
      <Stack>
        <Typography variant={"h6"}>No hay infracciones</Typography>
        <AddInfraction ownerId={ownerId} />
      </Stack>
    );
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
          {infractions.map((infraction, index) => (
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