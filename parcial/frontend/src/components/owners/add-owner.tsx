import {
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateOwnerInputs, ListOwnersGql, TOwner } from "../../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_OWNER, LIST_OWNERS } from "../../gql";
import { OwnerForm } from "./owner-form.tsx";

export const AddOwner = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateOwnerInputs>({});
  const [createOwner] = useMutation<{ createOwner: TOwner }, { ownerInput: CreateOwnerInputs }>(CREATE_OWNER, {
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
      const owner = data?.createOwner;
      const response = cache.readQuery<ListOwnersGql>({ query: LIST_OWNERS });
      if (!response) return;
      cache.writeQuery({
        query: LIST_OWNERS,
        data: {
          listOwners: [...response.listOwners, owner],
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateOwnerInputs> = (data) => {
    createOwner({
      variables: {
        ownerInput: data,
      },
    });
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Agregar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Propietario</DialogTitle>
        <OwnerForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                   handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  );

};