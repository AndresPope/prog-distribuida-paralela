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
import { CreateInfractionInputs, ListOwnerInfractionsGql, TInfraction } from "../types";
import toast from "react-hot-toast";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { VehiclesSelector } from "./vehicles-selector.tsx";
import { useMutation } from "@apollo/client";
import { CREATE_INFRACTION, LIST_OWNER_INFRACTIONS } from "../gql";

export const AddInfraction = ({ ownerId }: { ownerId: string }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  const { register, handleSubmit, reset } = useForm<CreateInfractionInputs>();
  const [createInfraction] = useMutation<{ createInfraction: TInfraction }, {
    createInfractionInput: CreateInfractionInputs
  }>(CREATE_INFRACTION, {
    onError: (error) => {
      console.log("=>(add-infraction.tsx:32) error", error);
      const message = error.message;
      toast.error(`Ocurrio un error al crear la infracción, ${message}`);
    },
    onCompleted: async () => {
      reset();
      toast.success("Infracción asignada correctamente");
      setOpen(false);
    },
    update: (cache, { data }) => {
      const infraction = data?.createInfraction;
      const response = cache.readQuery<ListOwnerInfractionsGql>({
        query: LIST_OWNER_INFRACTIONS, variables: {
          ownerId,
        },
      });
      if (!response) return null;
      cache.writeQuery({
        query: LIST_OWNER_INFRACTIONS,
        variables: { ownerId },
        data: {
          listAllOwnerInfractions: [
            ...response.listAllOwnerInfractions,
            infraction,
          ],
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateInfractionInputs> = (data) => {
    data.ownerId = ownerId;
    data.date = date?.toISOString() as string;
    createInfraction({
      variables: { createInfractionInput: data },
    });
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