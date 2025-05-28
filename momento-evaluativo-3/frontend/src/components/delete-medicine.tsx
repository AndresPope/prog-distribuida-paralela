import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_MEDICINE, LIST_MEDICINES } from "../gql";
import { ListMedicinesGql } from "../types";

export const DeleteMedicine = ({ medId }: { medId: number }) => {
  console.log("med", medId);
  const [deleteOwner] = useMutation<{
    deleteOwner: {
      id: number
    }
  }>(DELETE_MEDICINE, {
    variables: {
      id: medId,
    },
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al eliminar el propietario, ${message}`);
    },
    onCompleted: async () => {
      toast.success("Propietario eliminado correctamente");
    },
    update: (cache) => {
      const response = cache.readQuery<ListMedicinesGql>({
        query: LIST_MEDICINES,
      });
      if (!response) return;
      cache.writeQuery({
        query: LIST_MEDICINES,
        data: {
          listAllMedicines: response.listAllMedicines.filter((med) => med.id !== medId),
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