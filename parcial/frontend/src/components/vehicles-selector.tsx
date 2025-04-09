import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { CreateInfractionInputs, ListOwnerVehiclesSummaryGql } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_OWNER_VEHICLES } from "../gql";


export const VehiclesSelector = ({ ownerId, register }: {
  ownerId: string,
  register: UseFormRegister<CreateInfractionInputs>
}) => {

  const { data } = useQuery<ListOwnerVehiclesSummaryGql>(LIST_OWNER_VEHICLES, {
    variables: { ownerId },
  });

  const vehicles = data?.listAllOwnerVehicles || [];

  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle-selector" sx={{ pl: 0 }}>Vehiculos del propietario</InputLabel>
      <Select
        required={true}
        {...register("vehicleId", { required: true })}
        labelId="vehicle-selector"
        id="vehicle-selector-input"
        label="Vehiculos del propietario"
        variant={"standard"}
      >
        {vehicles.map((vehicle, index) => (
          <MenuItem key={index} value={vehicle.id}>{vehicle.plate}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );


};