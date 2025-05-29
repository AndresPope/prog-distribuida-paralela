export enum MedicineType {
  TABLETA = "TABLETA",
  JARABE = "JARABE",
  POLVO = "POLVO",
  GOTAS = "GOTAS",
}

export type TMedicine = {
  id: number
  name: string
  kind: MedicineType
  laboratory: string
  quantity: number
  expirationDate: Date
  registrationDate: Date
}


export type CreateMedicineInputs = {
  name: string
  kind: MedicineType
  laboratory: string
  quantity: number
  expirationDate: Date
}

export type ListMedicinesGql = {
  listAllMedicines: TMedicine[]
}

export type TMedsStats = {
  totalMeds: number;
  percentagePerType: string;
  meds: TMedicine[];
}

export type GetMedsStats = {
  getMedicinesStats: TMedsStats
}
