import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const baseUrl = import.meta.env.VITE_API;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: baseUrl,
});

export const LIST_OWNERS = gql`
    query ListOwners {
        listOwners {
            id
            identification
            name
            address
            type
        }
    }`;

export const LIST_OWNER_INFRACTIONS = gql`
    query ListAllOwnerInfractions($ownerId: String!) {
        listAllOwnerInfractions(ownerId: $ownerId) {
            id
            date
            detectionType
            vehicle{
                plate
                id
            }
        }
    }`;

export const LIST_OWNER_VEHICLES = gql`
    query ListAllOwnerVehicles($ownerId: String!) {
        listAllOwnerVehicles(ownerId: $ownerId) {
            id
            plate
            brand
            registrationDate
            type
        }
    }`;

export const CREATE_OWNER = gql`
    mutation CreateOwner($ownerInput: CreateOwnerInput!) {
        createOwner(OwnerInput: $ownerInput) {
            id
            identification
            name
            address
            type
        }
    }`;

export const CREATE_INFRACTION = gql`
    mutation CreateInfraction($createInfractionInput: CreateInfractionInput!) {
        createInfraction(CreateInfractionInput: $createInfractionInput) {
            id
            date
            detectionType
            vehicle{
                plate
            }
        }
    }`;

export const CREATE_VEHICLE = gql`
    mutation CreateVehicle($createVehicleInput: CreateVehicleInput!) {
        createVehicle(CreateVehicleInput: $createVehicleInput) {
            id
            plate
            brand
            registrationDate
            type
        }
    }`;

export const DELETE_OWNER = gql`
    mutation DeleteOwner($id: String!) {
        deleteOwner(id: $id) {
            name
        }
    }
`;

export const DELETE_INFRACTION = gql`
    mutation RemoveInfraction($id: String!) {
        removeInfraction(id: $id) {
            id
        }
    }
`;

export const DELETE_VEHICLE = gql`
    mutation RemoveVehicle($id: String!) {
        removeVehicle(id: $id) {
            id
        }
    }
`;

export const LIST_OWNERS_VEHICLES_SUMMARY = gql`
    query ListAllOwnerVehicles($ownerId: String!) {
        listAllOwnerVehicles(ownerId: $ownerId) {
            id
            plate
        }
    }`;

export const UPDATE_OWNER = gql`
    mutation UpdateOwner($input: UpdateOwnerInput!) {
        updateOwner(OwnerUpdateInput: $input) {
            id
            identification
            name
            address
            type
        }
    }
`;

export const UPDATE_INFRACTION = gql`
    mutation UpdateInfraction($updateInput: UpdateInfractionInput!) {
        updateInfraction(UpdateInfractionInput: $updateInput) {
            id
            date
            detectionType
            vehicle{
                plate
            }
        }
    }`;

export const UPDATE_VEHICLE = gql`
    mutation UpdateVehicle($updateInput: UpdateVehicleInput!) {
        updateVehicle(UpdateVehicleInput: $updateInput) {
            id
            plate
            brand
            registrationDate
            type
        }
    }`;