import {
  Dialog,
  DialogTitle, IconButton,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateVehicleInputs, TVehicle } from "../../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LIST_OWNER_VEHICLES, UPDATE_VEHICLE } from "../../gql";
import { VehicleForm } from "./vehicle-form.tsx";
import Edit from "@mui/icons-material/Edit";

type UpdateVehicleInputs = CreateVehicleInputs & {
  id: string
}

export const UpdateVehicle = ({ ownerId, vehicle }: { ownerId: string, vehicle: TVehicle }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateVehicleInputs>();
  const [updateVehicle] = useMutation<{ updateVehicle: TVehicle }, {
    updateInput: UpdateVehicleInputs
  }>(UPDATE_VEHICLE, {
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
      const updatedVehicle = data?.updateVehicle;
      const response = cache.readQuery<{ listAllOwnerVehicles: TVehicle[] }>({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
      });
      if (!response) return null;
      const index = response.listAllOwnerVehicles.findIndex(v => v.id === vehicle.id);
      cache.writeQuery({
        query: LIST_OWNER_VEHICLES,
        variables: { ownerId },
        data: {
          listAllOwnerVehicles: response.listAllOwnerVehicles.toSpliced(index, 1, updatedVehicle),
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateVehicleInputs> = async (data) => {
    data.ownerId = ownerId;
    updateVehicle({
      variables: { updateInput: { ...data, id: vehicle.id } },
    });
  };

  const initialValues: CreateVehicleInputs = {
    plate: vehicle.plate,
    brand: vehicle.brand,
    type: vehicle.type,
    ownerId: "",
  };


  return (
    <>
      <IconButton size={"small"} onClick={() => setOpen(!open)}>
        <Edit />
      </IconButton>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Vehiculo</DialogTitle>
        <VehicleForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}
                     handleClose={() => setOpen(false)} defaultValues={initialValues} />
      </Dialog>
    </>
  );

};