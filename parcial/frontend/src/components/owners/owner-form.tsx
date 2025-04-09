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
import { CreateOwnerInputs } from "../../types";

type Props = {
  register: UseFormRegister<CreateOwnerInputs>;
  handleSubmit: UseFormHandleSubmit<CreateOwnerInputs>;
  onSubmit: (data: CreateOwnerInputs) => void;
  handleClose?: () => void;
  defaultValues?: CreateOwnerInputs;
}

export const OwnerForm = ({ register, handleSubmit, defaultValues, handleClose, onSubmit }: Props) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>Registra los campos requeridos</DialogContentText>
        <Stack spacing={2} m={2} width={"80%"} alignItems={"center"}>
          <TextField defaultValue={defaultValues?.identification || ""} required={true}
                     fullWidth={true} {...register("identification", { required: true })}
                     name={"identification"}
                     variant={"standard"}
                     label={"Identificacion"} />
          <TextField defaultValue={defaultValues?.name || ""} required={true}
                     fullWidth={true} {...register("name", { required: true })} name={"name"}
                     variant={"standard"}
                     label={"Nombre"} />
          <TextField defaultValue={defaultValues?.address || ""} required={true}
                     fullWidth={true} {...register("address", { required: true })} name={"address"}
                     variant={"standard"}
                     label={"Dirección"} />
          <FormControl defaultValue={defaultValues?.type || ""} fullWidth>
            <InputLabel id="owner-type" sx={{ pl: 0 }}>Tipo de Propietario</InputLabel>
            <Select
              defaultValue={defaultValues?.type || ""}
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
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type={"submit"}>Aceptar</Button>
      </DialogActions>
    </form>
  );
};