import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const baseUrl = import.meta.env.VITE_API;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: baseUrl,
});

export const LIST_MEDICINES = gql`
    query ListMedicines {
        listAllMedicines {
            id
            name
            kind
            laboratory
            quantity
            expirationDate
            registrationDate
        }
    }`;


export const CREATE_MEDICINE = gql`
    mutation CreateMedicine($medicineInput: CreateMedicineGqlInput!) {
        createMedicine(CreateMedicineInput: $medicineInput) {
            id
            name
            kind
            laboratory
            quantity
            expirationDate
            registrationDate
        }
    }`;


export const DELETE_MEDICINE = gql`
    mutation DeleteMedicine($id: Float!) {
        removeMedicine(id: $id) {
            id
            name
        }
    }
`;

export const UPDATE_MEDICINE = gql`
    mutation UpdateOwner($input: UpdateMedicineInput!) {
        updateMedicine(UpdateMedicineInput: $input) {
            id
            name
            kind
            laboratory
            quantity
            expirationDate
            registrationDate
        }
    }
`;

export const GET_STATS = gql`
    query GetStats {
        getMedicinesStats {
            totalMeds
            percentagePerType
            meds {
                id
                name
                kind
                laboratory
                quantity
                expirationDate
                registrationDate
            }
        }
    }
`