import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteOwner, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const DeleteOwner = ({ ownerId }: { ownerId: string }) => {

  const { mutate } = useMutation({
    mutationFn: deleteOwner,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al eliminar el propietario, ${message}`);
    },
    onSuccess: async () => {
      toast.success("Propietario eliminado correctamente");
      await queryClient.fetchQuery({
        queryKey: ["owners"],
      });
    },
  });

  return (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => mutate(ownerId)}>
        <Delete />
      </IconButton>
    </Tooltip>

  );

};