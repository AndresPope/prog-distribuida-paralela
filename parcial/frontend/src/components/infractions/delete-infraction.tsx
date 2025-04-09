import { Payment } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_INFRACTION } from "../../gql";

export const DeleteInfraction = ({ infractionId, ownerId }: { infractionId: string, ownerId: string }) => {
  const [deleteInfraction] = useMutation<{ deleteInfraction: { id: string } }, { id: string }>(DELETE_INFRACTION, {
    variables: {
      id: infractionId,
    },
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al eliminar la infracción, ${message}`);
    },
    onCompleted: async () => {
      toast.success("Infracción eliminada correctamente");
    },
    update: (cache, { data }) => {
      const id = data?.deleteInfraction.id;
      const response = cache.readQuery<{ listInfractions: { id: string }[] }>({
        query: DELETE_INFRACTION,
        variables: { ownerId },
      });
      if (!id || !response) return;
      cache.writeQuery({
        query: DELETE_INFRACTION,
        data: {
          listInfractions: response.listInfractions.filter((infraction) => infraction.id !== id),
        },
      });
    },
  });

  return (
    <Tooltip title="Pagar">
      <IconButton onClick={() => deleteInfraction()}>
        <Payment />
      </IconButton>
    </Tooltip>

  );

};