import { isNonEmptyString, NonEmptyString } from 'newtype-ts/lib/NonEmptyString';
import { isPositiveInteger, PositiveInteger } from 'newtype-ts/lib/PositiveInteger'
import { Newtype } from 'newtype-ts'
import * as E  from "fp-ts/lib/Either";
import * as A from 'fp-ts/lib/Apply';

export type Unit = Newtype<{readonly Unit: unique symbol}, NonEmptyString>
export type Value = Newtype<{readonly Value: unique symbol}, PositiveInteger>

export type Distance = Readonly<{
    value: Value,
    unit: Unit
}>

class InvalidDistanceValueError extends TypeError {
	public __tag: 'InvalidDistanceValueError' = 'InvalidDistanceValueError'
	private constructor(value: unknown) {
		super(`${value} is invalid distance value`)
	}

	public static of(value: unknown) {
		return new InvalidDistanceValueError(value);
	}
}

class InvalidDitanceUnitError extends TypeError {
	public __tag: 'InvalidDitanceUnitError' = 'InvalidDitanceUnitError'
	private constructor(value: unknown) {
		super(`${value} is invalid unit value`)
	}

	public static of(value: unknown) {
		return new InvalidDitanceUnitError(value);
	}
}

export type DistanceError = InvalidDistanceValueError | InvalidDitanceUnitError

type Constuctor<T> = (value: unknown) => E.Either<DistanceError, T>

const isValue = (n: unknown): n is Value => typeof n === 'number' && isPositiveInteger(n)
const valueFromNumber: Constuctor<Value> = E.fromPredicate(isValue, (val) => InvalidDitanceUnitError.of(val))

const isUnit = (s: unknown): s is Unit => typeof s === 'string' && isNonEmptyString(s)
const unitFromString: Constuctor<Unit> = E.fromPredicate(isUnit, (val) => InvalidDistanceValueError.of(val))

const parseFare = A.sequenceS(E.Apply)

export const forCurrency = (unit: string) => (value: number) => {
	return parseFare({
		amount: valueFromNumber(value),
		currency: unitFromString(unit)
	});
}