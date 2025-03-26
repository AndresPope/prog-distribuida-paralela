import axios from "axios";
import { CreateOwnerInputs, CreateVehicleInputs, TInfraction, TOwner, TVehicle } from "../types";
import { QueryClient } from "@tanstack/react-query";

export const baseUrl = import.meta.env.VITE_API;

export const queryClient = new QueryClient();

//owners

export async function listOwners() {
  const res = await axios.get<TOwner[]>(`${baseUrl}/owners/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export async function createOwner(input: CreateOwnerInputs) {
  const res = await axios.post<TOwner>(`${baseUrl}/owners/`, input, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export const deleteOwner = async (ownerId: string) => {
  const res = await axios.delete(`${baseUrl}/owners/${ownerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//vehicles

export const listVehiclesByOwner = async (ownerId: string) => {
  const res = await axios.get<TVehicle[]>(`${baseUrl}/owners/${ownerId}/vehicles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const createVehicle = async (input: CreateVehicleInputs) => {
  const res = await axios.post<TVehicle>(`${baseUrl}/vehicles/`, input, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;

};


export const deleteVehicle = async (vehicleId: string) => {
  const res = await axios.delete(`${baseUrl}/vehicles/${vehicleId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//infractions

export const listInfractionsByOwner = async (ownerId: string) => {
  const res = await axios.get<TInfraction[]>(`${baseUrl}/owners/${ownerId}/infractions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};