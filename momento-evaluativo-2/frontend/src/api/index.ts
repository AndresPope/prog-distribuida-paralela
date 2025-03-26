import axios from "axios";
import { TInfraction, TOwner, TVehicle } from "../types";

export const baseUrl = import.meta.env.VITE_API;

export async function listOwners() {
  const res = await axios.get<TOwner[]>(`${baseUrl}/owners/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export const listVehiclesByOwner = async (ownerId: string) => {
  const res = await axios.get<TVehicle[]>(`${baseUrl}/owners/${ownerId}/vehicles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const listInfractionsByOwner = async (ownerId: string) => {
  const res = await axios.get<TInfraction[]>(`${baseUrl}/owners/${ownerId}/infractions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};