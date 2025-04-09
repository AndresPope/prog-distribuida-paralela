import {
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateVehicleInputs, TVehicle } from "../../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_VEHICLE, LIST_OWNER_VEHICLES } from "../../gql";
import { VehicleForm } from "./vehicle-form.tsx";

export const AddVehicle = ({ ownerId }: { ownerId: string }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateVehicleInputs>();
  const [createVehicle] = useMutation<{ createVehicle: TVehicle }, {
    createVehicleInput: CreateVehicleInputs
  }>(CREATE_VEHICLE, {
    onCompleted: () => {
      reset();
      toast.success("Vehiculo asignado correctamente");
      setOpen(false);
    },
    onError: (error) => {
      console.log("=>(add-owner.tsx:35) error", error);
      const message = error.message;
      toast.error(`Ocurrio un error al asignar el vehiculo al propietario, ${message}`);
    },
    update: (cache, { data }) => {
      const vehicle = data?.createVehicle;
      const response = cache.readQuery<{ listAllOwnerVehicles: TVehicle[] }>({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
      });
      if (!response) return null;
      cache.writeQuery({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
        data: {
          listAllOwnerVehicles: [
            ...response.listAllOwnerVehicles,
            vehicle,
          ],
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateVehicleInputs> = async (data) => {
    data.ownerId = ownerId;
    createVehicle({
      variables: { createVehicleInput: data },
    });
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Asignar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Vehiculo</DialogTitle>
        <VehicleForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                     handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  );

};