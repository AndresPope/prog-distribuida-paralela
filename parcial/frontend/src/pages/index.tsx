import {
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingScreen } from "../components/loading.tsx";
import { getOwnerType } from "../functions";
import { useNavigate } from "react-router";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { AddOwner } from "../components/add-owner.tsx";
import { DeleteOwner } from "../components/delete-owner.tsx";
import { useQuery } from "@apollo/client";
import { ListOwnersGql } from "../types";
import { LIST_OWNERS } from "../gql";


export const OwnersList = () => {
  const navigate = useNavigate();

  const navigateToInfractions = (ownerId: string) => {
    navigate("/infractions", { state: { ownerId } });
  };

  const navigateToVehicles = (ownerId: string) => {
    navigate("/vehicles", { state: { ownerId } });
  };

  const { loading, error, data } = useQuery<ListOwnersGql>(LIST_OWNERS);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  const owners = data.listOwners;

  return (
    <>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant={"h6"}>Propietarios</Typography>
        <AddOwner />
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#0088d1" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Identificacion</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo de cliente</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Direccion</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owners.map((owner, index) => (
            <TableRow key={index}>
              <TableCell>{owner.name}</TableCell>
              <TableCell>{owner.identification}</TableCell>
              <TableCell>{getOwnerType(owner.type)}</TableCell>
              <TableCell>{owner.address}</TableCell>
              <TableCell>
                <Stack direction={"row"}>
                  <Tooltip title={"Vehiculos"}>
                    <IconButton onClick={() => navigateToVehicles(owner.id)}>
                      <TimeToLeaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Infracciones"}>
                    <IconButton onClick={() => navigateToInfractions(owner.id)}>
                      <RequestQuoteIcon />
                    </IconButton>
                  </Tooltip>
                  <DeleteOwner ownerId={owner.id} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};