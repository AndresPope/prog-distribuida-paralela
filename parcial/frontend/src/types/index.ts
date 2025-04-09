export enum OwnerType {
  PERSON = "PERSON",
  COMPANY = "COMPANY",
}

export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  HEAVY_CAR = "HEAVY_CAR",
}

export enum DetectionType {
  AGENT = "AGENT",
  CAMERA = "CAMERA"
}

export type TOwner = {
  id: string
  identification: string
  name: string
  address: string
  type: OwnerType
}

export type TVehicle = {
  id: string
  plate: string
  brand: string
  //Date
  registrationDate: string
  type: VehicleType
}

export type TInfraction = {
  id: string
  //Date
  date: string
  detectionType: DetectionType
  vehicle: {
    plate: string
    id: string
  }
}

export type CreateOwnerInputs = {
  identification: string;
  name: string;
  address: string;
  type: OwnerType;
}

export type CreateVehicleInputs = {
  plate: string
  brand: string
  type: VehicleType
  ownerId: string
}

export type CreateInfractionInputs = {
  detectionType: DetectionType
  vehicleId: string
  ownerId: string
  date: string
}

export type ListOwnersGql = {
  listOwners: TOwner[]
}

export type ListOwnerInfractionsGql = {
  listAllOwnerInfractions: TInfraction[]
}

export type ListOwnerVehiclesGql = {
  listAllOwnerVehicles: TVehicle[]
}

export type VehicleSummary = {
  id: string
  plate: string
}

export type ListOwnerVehiclesSummaryGql = {
  listAllOwnerVehicles: VehicleSummary[]
}