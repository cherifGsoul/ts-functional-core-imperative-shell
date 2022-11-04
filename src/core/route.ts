import { Address } from "."

export type Route = Readonly<{
    origin: Address.Address,
    destination: Address.Address,
}>

export const between = (origin: Address.Address, destination: Address.Address): Route => {
    return {origin, destination}
}

export const equals = (route: Route, other: Route): boolean => {
    return Address.equals(route.origin, other.origin) && Address.equals(route.destination, other.destination)
}
