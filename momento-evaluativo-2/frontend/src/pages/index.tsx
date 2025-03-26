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
import { useQuery } from "@tanstack/react-query";
import { listOwners } from "../api";
import { LoadingScreen } from "../components/loading.tsx";
import { getOwnerType } from "../functions";
import { useNavigate } from "react-router";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { AddOwner } from "../components/add-owner.tsx";
import { DeleteOwner } from "../components/delete-owner.tsx";


export const OwnersList = () => {
  const navigate = useNavigate();

  const navigateToInfractions = (ownerId: string) => {
    navigate("/infractions", { state: { ownerId } });
  };

  const navigateToVehicles = (ownerId: string) => {
    navigate("/vehicles", { state: { ownerId } });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["owners"],
    queryFn: listOwners,
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
        <Typography variant={"h6"}>Propietarios</Typography>
        <AddOwner />
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Identificacion</TableCell>
            <TableCell>Tipo de cliente</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((owner, index) => (
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