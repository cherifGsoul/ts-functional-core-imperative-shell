import { Address } from "."

export type Route = Readonly<{
    origin: Address.Address,
    destination: Address.Address,
}>

export const between = (origin: Address.Address, destination: Address.Address): Route => {
    return {origin, destination}
}