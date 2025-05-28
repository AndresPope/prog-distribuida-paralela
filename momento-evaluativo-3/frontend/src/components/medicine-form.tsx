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
import { CreateMedicineInputs } from "../types";

type Props = {
  register: UseFormRegister<CreateMedicineInputs>;
  handleSubmit: UseFormHandleSubmit<CreateMedicineInputs>;
  onSubmit: (data: CreateMedicineInputs) => void;
  handleClose?: () => void;
  defaultValues?: CreateMedicineInputs;
}

export const MedicineForm = ({ register, handleSubmit, defaultValues, handleClose, onSubmit }: Props) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>Registra los campos requeridos</DialogContentText>
        <Stack spacing={2} m={2} width={"80%"} alignItems={"center"}>
          <TextField defaultValue={defaultValues?.name || ""} required={true}
                     fullWidth={true} {...register("name", { required: true })}
                     name={"name"}
                     variant={"standard"}
                     label={"Nombre"} />
          <FormControl defaultValue={defaultValues?.kind || ""} fullWidth>
            <InputLabel id="medicine-type" sx={{ pl: 0 }}>Tipo de Medicina</InputLabel>
            <Select
              defaultValue={defaultValues?.kind || ""}
              required={true}
              {...register("kind", { required: true })}
              labelId="medicine-type"
              id="medicine-type"
              label="Tipo de Medicina"
              variant={"standard"}
            >
              <MenuItem value={"TABLETA"}>TABLETA</MenuItem>
              <MenuItem value={"JARABE"}>JARABE</MenuItem>
              <MenuItem value={"POLVO"}>POLVO</MenuItem>
              <MenuItem value={"GOTAS"}>GOTAS</MenuItem>
            </Select>
          </FormControl>
          <TextField defaultValue={defaultValues?.laboratory || ""} required={true}
                     fullWidth={true} {...register("laboratory", { required: true })} name={"laboratory"}
                     variant={"standard"}
                     label={"Laboratorio"} />
          <TextField defaultValue={defaultValues?.quantity || ""} required={true}
                     fullWidth={true} {...register("quantity", { required: true })} name={"quantity"}
                     variant={"standard"}
                     type={"number"}
                     label={"Cantidad"} />
          <TextField defaultValue={defaultValues?.expirationDate || ""} required={true}
                     fullWidth={true} {...register("expirationDate", { required: true })} name={"expirationDate"}
                     variant={"standard"}
                     type={"date"}
                     label={"Fecha de expiracion"} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type={"submit"}>Aceptar</Button>
      </DialogActions>
    </form>
  );
};