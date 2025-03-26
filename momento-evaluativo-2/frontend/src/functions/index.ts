import { DetectionType, OwnerType, VehicleType } from "../types";

export const getOwnerType = (owner: OwnerType) => {
  if (owner === "PERSON") {
    return "Persona Natural";
  }
  return "Persona Juridica";
};

export const getVehicleType = (vehicle: VehicleType) => {

  if (vehicle === "CAR") {
    return "Carro";
  }
  if (vehicle === "BIKE") {
    return "Moto";
  }
  return "Carro Pesado";

};

export const getInfractionType = (infraction: DetectionType) => {

  if (infraction === "AGENT") {
    return "Agente";
  }
  return "Camara";

};