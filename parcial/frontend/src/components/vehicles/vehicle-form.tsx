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
  TextField,
} from "@mui/material";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CreateVehicleInputs } from "../../types";

type Props = {
  register: UseFormRegister<CreateVehicleInputs>;
  handleSubmit: UseFormHandleSubmit<CreateVehicleInputs>;
  onSubmit: (data: CreateVehicleInputs) => void;
  handleClose: () => void;
  defaultValues?: CreateVehicleInputs;
}


export const VehicleForm = ({ register, handleSubmit, onSubmit, defaultValues, handleClose }: Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>Registra los campos requeridos</DialogContentText>
        <Stack spacing={2} m={2} width={"80%"} alignItems={"center"}>
          <TextField defaultValue={defaultValues?.plate} required={true}
                     fullWidth={true} {...register("plate", { required: true })}
                     name={"plate"}
                     variant={"standard"}
                     label={"Matricula"} />
          <TextField defaultValue={defaultValues?.brand} required={true}
                     fullWidth={true} {...register("brand", { required: true })} name={"brand"}
                     variant={"standard"}
                     label={"Marca"} />
          <FormControl defaultValue={defaultValues?.type} fullWidth>
            <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Vehiculo</InputLabel>
            <Select defaultValue={defaultValues?.type}
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
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type={"submit"}>Aceptar</Button>
      </DialogActions>
    </form>
  );
};