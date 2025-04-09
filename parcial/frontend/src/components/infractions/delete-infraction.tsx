import { Payment } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_INFRACTION, LIST_OWNER_INFRACTIONS } from "../../gql";
import { ListOwnerInfractionsGql } from "../../types";

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
    update: (cache) => {
      const response = cache.readQuery<ListOwnerInfractionsGql>({
        query: LIST_OWNER_INFRACTIONS,
        variables: { ownerId },
      });
      if ( !response) return;
      cache.writeQuery({
        query: LIST_OWNER_INFRACTIONS,
        variables: { ownerId },
        data: {
          listAllOwnerInfractions: response.listAllOwnerInfractions.filter((infraction) => infraction.id !== infractionId),
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