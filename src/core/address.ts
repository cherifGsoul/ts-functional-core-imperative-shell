import { ServedCity } from "."
import * as E from "fp-ts/lib/Either";
import { isNonEmptyString, NonEmptyString } from 'newtype-ts/lib/NonEmptyString';
import { Newtype } from 'newtype-ts'
import * as A from 'fp-ts/lib/Apply';


export type Street = Newtype<{readonly Street: unique symbol}, NonEmptyString>

export type Address = {
    street: Street,
    city: ServedCity.ServedCity
}

class InvalidAddressStreet extends TypeError {
    public _tag: 'InvalidAddressStreet' = 'InvalidAddressStreet'
    private constructor(value: unknown){
        super(`${value} Invalid served city`)
    }

    static of(value: unknown) {
        return new InvalidAddressStreet(value)
    }
} 

type AddressError = InvalidAddressStreet | ServedCity.ServedCityError

type Constructor<T> = (value: unknown) => E.Either<AddressError, T>

const isStreet = (val: unknown): val is Street => typeof val === 'string' && isNonEmptyString(val)
const streetFromString: Constructor<Street> = E.fromPredicate(isStreet, (value) => InvalidAddressStreet.of(value))

const parseAddress = A.sequenceS(E.Apply);

export const forCity = (city: string) => (street: string) => {
    return parseAddress({
		street: streetFromString(street),
		city: ServedCity.of(city)
	});
}