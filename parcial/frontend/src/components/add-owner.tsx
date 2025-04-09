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
import { CreateOwnerInputs } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createOwner, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const AddOwner = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateOwnerInputs>();
  const { mutate } = useMutation({
    mutationFn: createOwner,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al crear el propietario, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onSuccess: async () => {
      reset();
      toast.success("Propietario creado correctamente");
      await queryClient.fetchQuery({ queryKey: ["owners"] });
      setOpen(false);
    },
  });
  const onSubmit: SubmitHandler<CreateOwnerInputs> = (data) => {
    mutate(data);
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Agregar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Propietario</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Registra los campos requeridos</DialogContentText>
            <Stack spacing={2} m={2} width={"80%"} alignItems={"center"}>
              <TextField required={true} fullWidth={true} {...register("identification", { required: true })}
                         name={"identification"}
                         variant={"standard"}
                         label={"Identificacion"} />
              <TextField required={true} fullWidth={true} {...register("name", { required: true })} name={"name"}
                         variant={"standard"}
                         label={"Nombre"} />
              <TextField required={true} fullWidth={true} {...register("address", { required: true })} name={"address"}
                         variant={"standard"}
                         label={"Dirección"} />
              <FormControl fullWidth>
                <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Propietario</InputLabel>
                <Select
                  required={true}
                  {...register("type", { required: true })}
                  labelId="owner-type"
                  id="owner-type-input"
                  label="Tipo de Propietario"
                  variant={"standard"}
                >
                  <MenuItem value={"PERSON"}>Persona</MenuItem>
                  <MenuItem value={"COMPANY"}>Compañia</MenuItem>
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