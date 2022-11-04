import { ServedCity } from "."

export type Address = {
    street: string,
    city: ServedCity.ServedCity
}

export const equals = (address: Address, other: Address): boolean => {
    if (!ServedCity.equals(address.city, other.city)) {
        return false;
    }
    return address.street === other.street
}

