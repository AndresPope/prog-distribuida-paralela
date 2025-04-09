import { Payment } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteInfraction, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const DeleteInfraction = ({ infractionId, ownerId }: { infractionId: string, ownerId: string }) => {
  const { mutate } = useMutation({
    mutationFn: deleteInfraction,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al eliminar la infracción, ${message}`);
    },
    onSuccess: async () => {
      toast.success("Infracción eliminada correctamente");
      await queryClient.fetchQuery({
        queryKey: ["infractions", ownerId],
      });
    },
  });

  return (
    <Tooltip title="Pagar">
      <IconButton onClick={() => mutate(infractionId)}>
        <Payment />
      </IconButton>
    </Tooltip>

  );

};