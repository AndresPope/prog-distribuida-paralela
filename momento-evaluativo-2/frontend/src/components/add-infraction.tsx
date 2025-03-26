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
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateInfractionInputs } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createInfraction, queryClient } from "../api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { VehiclesSelector } from "./vehicles-selector.tsx";

export const AddInfraction = ({ ownerId }: { ownerId: string }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  const { register, handleSubmit, reset } = useForm<CreateInfractionInputs>();
  const { mutate } = useMutation({
    mutationFn: createInfraction,
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error;
      toast.error(`Ocurrio un error al crear la infracción, ${message}`);
      console.log("=>(add-infraction.tsx:32) error", error);
    },
    onSuccess: async () => {
      reset();
      toast.success("Infracción asignada correctamente");
      await queryClient.fetchQuery({ queryKey: ["infractions", ownerId] });
      setOpen(false);
    },
  });
  const onSubmit: SubmitHandler<CreateInfractionInputs> = (data) => {
    data.ownerId = ownerId;
    data.date = date?.toISOString() as string;
    mutate(data);
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Asignar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Infracción</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Registra los campos requeridos</DialogContentText>
            <Stack spacing={2} m={2} width={"80%"}>
              <VehiclesSelector ownerId={ownerId} register={register} />
              <FormControl fullWidth>
                <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Detección</InputLabel>
                <Select
                  required={true}
                  {...register("detectionType", { required: true })}
                  labelId="detection-type"
                  id="detection-type-input"
                  label="Tipo de Detección"
                  variant={"standard"}
                >
                  <MenuItem value={"CAMERA"}>Camara</MenuItem>
                  <MenuItem value={"AGENT"}>Agente</MenuItem>
                </Select>
              </FormControl>
              <DateTimePicker maxDateTime={dayjs(new Date())} sx={{ w: "100%" }} onChange={(val) => setDate(val)}
                              label="Fecha de la infracción"
                              defaultValue={date} />
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