import {
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_MEDICINE, LIST_MEDICINES } from "../gql";
import { MedicineForm } from "./medicine-form.tsx";
import { CreateMedicineInputs, ListMedicinesGql, TMedicine } from "../types";

export const AddMedicine = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateMedicineInputs>({});
  const [createMedicine] = useMutation<{ createMedicine: TMedicine }, {
    medicineInput: CreateMedicineInputs
  }>(CREATE_MEDICINE, {
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al crear el medicamento, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onCompleted: () => {
      toast.success("El medicamento fue creado correctamente");
      setOpen(false);
      reset();
    },
    update: async (cache, { data }) => {
      const medicine = data?.createMedicine;
      const response = cache.readQuery<ListMedicinesGql>({ query: LIST_MEDICINES });
      if (!response) return;
      cache.writeQuery({
        query: LIST_MEDICINES,
        data: {
          listAllMedicines: [...response.listAllMedicines, medicine],
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateMedicineInputs> = (data) => {
    const { quantity, ...rest } = data;
    createMedicine({
      variables: {
        medicineInput: {
          quantity: Number(quantity),
          ...rest,
        },
      },
    });
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Agregar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Medicamento</DialogTitle>
        <MedicineForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                      handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  );

};