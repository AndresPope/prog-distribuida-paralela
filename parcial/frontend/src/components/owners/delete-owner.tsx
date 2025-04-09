import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_OWNER, LIST_OWNERS } from "../../gql";
import { ListOwnersGql } from "../../types";

export const DeleteOwner = ({ ownerId }: { ownerId: string }) => {

  const [deleteOwner] = useMutation<{
    deleteOwner: {
      id: string
    }
  }>(DELETE_OWNER, {
    variables: {
      id: ownerId,
    },
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al eliminar el propietario, ${message}`);
    },
    onCompleted: async () => {
      toast.success("Propietario eliminado correctamente");
    },
    update: (cache) => {
      const response = cache.readQuery<ListOwnersGql>({
        query: LIST_OWNERS,
      });
      if (!response) return;
      cache.writeQuery({
        query: LIST_OWNERS,
        data: {
          listOwners: response.listOwners.filter((owner) => owner.id !== ownerId),
        },
      });
    },
  });

  return (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => deleteOwner()}>
        <Delete />
      </IconButton>
    </Tooltip>

  );

};