import {
  Dialog,
  DialogTitle, IconButton, Tooltip,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateOwnerInputs, ListOwnersGql, TOwner } from "../../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LIST_OWNERS, UPDATE_OWNER } from "../../gql";
import { OwnerForm } from "./owner-form.tsx";
import { Edit } from "@mui/icons-material";

type Props = {
  owner: TOwner
}

type UpdateInputs = CreateOwnerInputs & {
  id: string
}

export const UpdateOwner = ({ owner }: Props) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateOwnerInputs>({});
  const [updateOwner] = useMutation<{ updateOwner: TOwner }, { input: UpdateInputs }>(UPDATE_OWNER, {
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al crear el propietario, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onCompleted: () => {
      toast.success("Propietario creado correctamente");
      setOpen(false);
      reset();
    },
    update: async (cache, { data }) => {
      const updatedOwner = data?.updateOwner;
      const response = cache.readQuery<ListOwnersGql>({ query: LIST_OWNERS });
      if (!response) return;
      const index = response.listOwners.findIndex((own) => own.id === owner.id);
      cache.writeQuery({
        query: LIST_OWNERS,
        data: {
          listOwners: response.listOwners.toSpliced(index, 1, updatedOwner),
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateOwnerInputs> = (data) => {
    updateOwner({
      variables: {
        input: { ...data, id: owner.id },
      },
    });
  };

  const initialValues = {
    identification: owner.identification,
    name: owner.name,
    address: owner.address,
    type: owner.type,
  };


  return (
    <>
      <Tooltip title={"Editar"}>
        <IconButton size={"small"} onClick={() => setOpen(!open)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Propietario</DialogTitle>
        <OwnerForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                   handleClose={() => setOpen(false)} defaultValues={initialValues} />
      </Dialog>
    </>
  );

};