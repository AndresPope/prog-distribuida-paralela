import {
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateInfractionInputs, ListOwnerInfractionsGql, TInfraction } from "../../types";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import { useMutation } from "@apollo/client";
import { CREATE_INFRACTION, LIST_OWNER_INFRACTIONS } from "../../gql";
import { InfractionForm } from "./infraction-form.tsx";

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

  const handleEditDate = (date: Dayjs | null) => {
    setDate(date);
  };


  return (
    <>
      <Button color={"info"} variant={"contained"} size={"small"} onClick={() => setOpen(!open)}>Asignar</Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Infracción</DialogTitle>
        <InfractionForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          handleClose={() => setOpen(false)}
          ownerId={ownerId}
          date={date}
          handleEditDate={handleEditDate}
        />
      </Dialog>
    </>
  );

};