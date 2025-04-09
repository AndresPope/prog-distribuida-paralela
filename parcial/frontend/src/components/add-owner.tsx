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
import { CreateOwnerInputs, ListOwnersGql, TOwner } from "../types";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_OWNER, LIST_OWNERS } from "../gql";

export const AddOwner = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateOwnerInputs>();
  const [createOwner] = useMutation<{ createOwner: TOwner }, { ownerInput: CreateOwnerInputs }>(CREATE_OWNER, {
    onError: (error) => {
      const message = error.message;
      toast.error(`Ocurrio un error al crear el propietario, ${message}`);
      console.log("=>(add-owner.tsx:35) error", error);
    },
    onCompleted: () => {
      reset();
      toast.success("Propietario creado correctamente");
      setOpen(false);
    },
    update: async (cache, { data }) => {
      const owner = data?.createOwner;
      const response = cache.readQuery<ListOwnersGql>({ query: LIST_OWNERS });
      if (!response) return;
      cache.writeQuery({
        query: LIST_OWNERS,
        data: {
          listOwners: [...response.listOwners, owner],
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateOwnerInputs> = (data) => {
    createOwner({
      variables: {
        ownerInput: data,
      },
    });
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