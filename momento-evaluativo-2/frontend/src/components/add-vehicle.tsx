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
import { CreateVehicleInputs } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createVehicle, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const AddVehicle = ({ ownerId }: { ownerId: string }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateVehicleInputs>();
  const { mutate } = useMutation({
    mutationFn: createVehicle,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al asignar el vehiculo al propietario, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onSuccess: async () => {
      reset();
      toast.success("Vehiculo asignado correctamente");
      await queryClient.fetchQuery({ queryKey: ["vehicles", ownerId] });
      setOpen(false);
    },
  });
  const onSubmit: SubmitHandler<CreateVehicleInputs> = (data) => {
    data.ownerId = ownerId;
    mutate(data);
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