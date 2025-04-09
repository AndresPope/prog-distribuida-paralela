import {
  Dialog,
  DialogTitle, IconButton,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateInfractionInputs, ListOwnerInfractionsGql, TInfraction } from "../../types";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import { useMutation } from "@apollo/client";
import { LIST_OWNER_INFRACTIONS, UPDATE_INFRACTION } from "../../gql";
import { InfractionForm } from "./infraction-form.tsx";
import { Edit } from "@mui/icons-material";

type UpdateInputs = CreateInfractionInputs & { id: string }

export const UpdateInfraction = ({ ownerId, infraction }: { ownerId: string, infraction: TInfraction }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date(infraction.date)));

  const { register, handleSubmit, reset } = useForm<CreateInfractionInputs>();
  const [updateInfraction] = useMutation<{ updateInfraction: TInfraction }, {
    updateInput: UpdateInputs,
  }>(UPDATE_INFRACTION, {
    onError: (error) => {
      console.log("=>(add-infraction.tsx:32) error", error);
      const message = error.message;
      toast.error(`Ocurrio un error al actualizar la infracción, ${message}`);
    },
    onCompleted: async () => {
      reset();
      toast.success("Infracción actualizada correctamente");
      setOpen(false);
    },
    update: (cache, { data }) => {
      const updatedInfraction = data?.updateInfraction;
      const response = cache.readQuery<ListOwnerInfractionsGql>({
        query: LIST_OWNER_INFRACTIONS, variables: {
          ownerId,
        },
      });
      if (!response) return null;
      const index = response.listAllOwnerInfractions.findIndex((inf) => inf.id === infraction.id);
      cache.writeQuery({
        query: LIST_OWNER_INFRACTIONS,
        variables: { ownerId },
        data: {
          //@ts-ignore
          listAllOwnerInfractions: response.listAllOwnerInfractions.toSpliced(index, 1, updatedInfraction),
        },
      });
    },
  });
  const onSubmit: SubmitHandler<CreateInfractionInputs> = (data) => {
    data.ownerId = ownerId;
    data.date = date?.toISOString() as string;
    updateInfraction({
      variables: { updateInput: { ...data, id: infraction.id } },
    });
  };

  const handleEditDate = (date: Dayjs | null) => {
    setDate(date);
  };

  const initialValues: CreateInfractionInputs = {
    ownerId: ownerId,
    detectionType: infraction.detectionType,
    date: "",
    vehicleId: infraction.vehicle.id,
  };


  return (
    <>
      <IconButton size={"small"} onClick={() => setOpen(!open)}>
        <Edit />
      </IconButton>
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
          defaultValues={initialValues}
        />
      </Dialog>
    </>
  );

};