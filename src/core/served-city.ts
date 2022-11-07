import * as E from "fp-ts/lib/Either";
import { isNonEmptyString, NonEmptyString } from 'newtype-ts/lib/NonEmptyString';
import { Newtype } from 'newtype-ts'

export type ServedCity = Newtype<{ readonly ServedCity: unique symbol }, NonEmptyString>

export class InvalidServedCityError extends TypeError {
    public _tag: 'InvalidServedCityError' = 'InvalidServedCityError'
    private constructor(value: unknown){
        super(`${value} Invalid served city`)
    }

    static of(value: unknown) {
        return new InvalidServedCityError(value)
    }
} 

export type ServedCityError = InvalidServedCityError

type Constructor<T> = (value: unknown) => E.Either<ServedCityError, T>

const isServedCity = (val: unknown): val is ServedCity => typeof val === 'string' && isNonEmptyString(val)
export const of: Constructor<ServedCity> = E.fromPredicate(isServedCity, (value) => InvalidServedCityError.of(value))

export const equals = (city: ServedCity, other: ServedCity): Boolean => {
    return city === other;
}
