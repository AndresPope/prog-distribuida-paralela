import {
  Dialog,
  DialogTitle, IconButton, Tooltip,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { MedicineForm } from "./medicine-form.tsx";
import { Edit } from "@mui/icons-material";
import { CreateMedicineInputs, ListMedicinesGql, TMedicine } from "../types";
import { LIST_MEDICINES, UPDATE_MEDICINE } from "../gql";

type Props = {
  medicine: TMedicine
}

type UpdateInputs = CreateMedicineInputs & {
  id: number
}

export const UpdateMedicine = ({ medicine }: Props) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateMedicineInputs>({});
  const [updateOwner] = useMutation<{ updateOwner: TMedicine }, { input: UpdateInputs }>(UPDATE_MEDICINE, {
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al actualizar la medicina, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onCompleted: () => {
      toast.success("Medicina actualizada correctamente");
      setOpen(false);
      reset();
    },
    update: async (cache, { data }) => {
      const updatedOwner = data?.updateOwner;
      const response = cache.readQuery<ListMedicinesGql>({ query: LIST_MEDICINES });
      if (!response) return;
      const index = response.listAllMedicines.findIndex((med) => med.id === medicine.id);
      cache.writeQuery({
        query: LIST_MEDICINES,
        data: {
          listAllMedicines: response.listAllMedicines.toSpliced(index, 1, updatedOwner),
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateMedicineInputs> = (data) => {
    updateOwner({
      variables: {
        input: { ...data, id: medicine.id },
      },
    });
  };

  const initialValues: UpdateInputs = {
    id: medicine.id,
    name: medicine.name,
    kind: medicine.kind,
    laboratory: medicine.laboratory,
    quantity: medicine.quantity,
    expirationDate: medicine.expirationDate,
  };


  return (
    <>
      <Tooltip title={"Editar"}>
        <IconButton size={"small"} onClick={() => setOpen(!open)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Actualizar Medicina</DialogTitle>
        <MedicineForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                      handleClose={() => setOpen(false)} defaultValues={initialValues} />
      </Dialog>
    </>
  );

};