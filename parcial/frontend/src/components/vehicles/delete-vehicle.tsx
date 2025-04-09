import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_VEHICLE } from "../../gql";

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
    update: (cache, { data }) => {
      const id = data?.deleteVehicle.id;
      const response = cache.readQuery<{ listVehicles: { id: string }[] }>({
        query: DELETE_VEHICLE,
        variables: { ownerId },
      });
      if (!id || !response) return;
      cache.writeQuery({
        query: DELETE_VEHICLE,
        data: {
          listVehicles: response.listVehicles.filter((vehicle) => vehicle.id !== id),
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