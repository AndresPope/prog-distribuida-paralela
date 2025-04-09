import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { VehiclesSelector } from "./vehicles-selector.tsx";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CreateInfractionInputs } from "../../types";

type Props = {
  register: UseFormRegister<CreateInfractionInputs>;
  handleSubmit: UseFormHandleSubmit<CreateInfractionInputs>;
  onSubmit: (data: CreateInfractionInputs) => void;
  handleClose: () => void;
  ownerId: string;
  defaultValues?: CreateInfractionInputs;
  date: Dayjs | null
  handleEditDate: (date: Dayjs | null) => void
}

export const InfractionForm = ({
                                 register,
                                 handleSubmit,
                                 onSubmit,
                                 handleClose,
                                 defaultValues,
                                 ownerId,
                                 date,
                                 handleEditDate,
                               }: Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>Registra los campos requeridos</DialogContentText>
        <Stack spacing={2} m={2} width={"80%"}>
          <VehiclesSelector defaultValue={defaultValues?.vehicleId} ownerId={ownerId} register={register} />
          <FormControl defaultValue={defaultValues?.detectionType} fullWidth>
            <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Detección</InputLabel>
            <Select
              defaultValue={defaultValues?.detectionType}
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
          <DateTimePicker maxDateTime={dayjs(new Date())} sx={{ w: "100%" }} onChange={(val) => handleEditDate(val)}
                          label="Fecha de la infracción"
                          defaultValue={date} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type={"submit"}>Aceptar</Button>
      </DialogActions>
    </form>
  );
};