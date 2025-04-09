import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateVehicleInputs, TVehicle } from "../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_VEHICLE, LIST_OWNER_VEHICLES } from "../gql";

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Registra los campos requeridos</DialogContentText>
            <Stack spacing={2} m={2} width={"80%"} alignItems={"center"}>
              <TextField required={true} fullWidth={true} {...register("plate", { required: true })}
                         name={"plate"}
                         variant={"standard"}
                         label={"Matricula"} />
              <TextField required={true} fullWidth={true} {...register("brand", { required: true })} name={"brand"}
                         variant={"standard"}
                         label={"Marca"} />
              <FormControl fullWidth>
                <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Vehiculo</InputLabel>
                <Select
                  required={true}
                  {...register("type", { required: true })}
                  labelId="vehicle-type"
                  id="vehicle-type-input"
                  label="Tipo de Vehiculo"
                  variant={"standard"}
                >
                  <MenuItem value={"BIKE"}>Motocicleta</MenuItem>
                  <MenuItem value={"CAR"}>Carro</MenuItem>
                  <MenuItem value={"HEAVY_CAR"}>Carro Pesado</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type={"submit"}>Aceptar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );

};