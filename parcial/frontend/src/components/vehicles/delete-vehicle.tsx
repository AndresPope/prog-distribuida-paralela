import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_VEHICLE, LIST_OWNER_VEHICLES } from "../../gql";
import { ListOwnerVehiclesGql } from "../../types";

export const DeleteVehicle = ({ vehicleId, ownerId }: { vehicleId: string, ownerId: string }) => {

  const [deleteVehicle] = useMutation<{ deleteVehicle: { id: string } }, { id: string }>(DELETE_VEHICLE, {
    variables: {
      id: vehicleId,
    },
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al eliminar el vehiculo, ${message}`);
    },
    onCompleted: () => {
      toast.success("Vehiculo eliminado correctamente");
    },
    update: (cache) => {
      const response = cache.readQuery<ListOwnerVehiclesGql>({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
      });
      if (!response) return;
      console.log(vehicleId);
      cache.writeQuery({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
        data: {
          listAllOwnerVehicles: response.listAllOwnerVehicles.filter((vehicle) => vehicle.id !== vehicleId),
        },
      });
    },
  });

  return (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => deleteVehicle()}>
        <Delete />
      </IconButton>
    </Tooltip>

  );

};