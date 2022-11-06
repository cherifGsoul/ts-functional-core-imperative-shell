import { ServedCity } from "."
import { NonEmptyString } from 'newtype-ts/lib/NonEmptyString'

export type Address = {
    street: NonEmptyString,
    city: ServedCity.ServedCity
}

export const equals = (address: Address, other: Address): boolean => {
    if (!ServedCity.equals(address.city, other.city)) {
        return false;
    }
    return address.street === other.street
}

