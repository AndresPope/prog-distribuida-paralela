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
  vehicles: TVehicle[]
  infractions: TInfraction[]
  createdAt: Date
  updatedAt: Date
}

export type TVehicle = {
  id: string
  plate: string
  brand: string
  //Date
  registrationDate: string
  type: VehicleType
  owner: TOwner
  ownerId: string
  infractions: TInfraction[]
  //Date
  createdAt: string
  //Date
  updatedAt: string
}

export type TInfraction = {
  id: string
  //Date
  date: string
  detectionType: DetectionType
  vehicle: TVehicle
  vehicleId: string
  //Date
  createdAt: string
  Owner: TOwner
  ownerId: string
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
