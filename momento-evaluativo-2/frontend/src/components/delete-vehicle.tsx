import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteVehicle, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const DeleteVehicle = ({ vehicleId, ownerId }: { vehicleId: string, ownerId: string }) => {

  const { mutate } = useMutation({
    mutationFn: deleteVehicle,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al eliminar el vehiculo, ${message}`);
    },
    onSuccess: async () => {
      toast.success("Vehiculo eliminado correctamente");
      await queryClient.fetchQuery({
        queryKey: ["vehicles", ownerId],
      });
    },
  });

  return (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => mutate(vehicleId)}>
        <Delete />
      </IconButton>
    </Tooltip>

  );

};