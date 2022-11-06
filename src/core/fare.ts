import { isNonEmptyString, NonEmptyString } from 'newtype-ts/lib/NonEmptyString';
import { isPositiveInteger, PositiveInteger } from 'newtype-ts/lib/PositiveInteger';
import { Newtype } from 'newtype-ts';
import * as E  from "fp-ts/lib/Either";
import * as A from 'fp-ts/lib/Apply';

export type Amount = Newtype<{readonly Amount: unique symbol}, PositiveInteger>

export type Currency = Newtype<{readonly Currency: unique symbol}, NonEmptyString>
export type Fare = {
	amount: Amount,
	currency: Currency
}

class InvalidFareAmountError extends TypeError {
	public __tag: 'InvalidFareAmountError' = 'InvalidFareAmountError'
	private constructor(value: unknown) {
		super(`${value} is invalid amount value`)
	}

	public static of(value: unknown) {
		return new InvalidFareAmountError(value);
	}
}
class InvalidCurrencyError extends TypeError {
	public __tag: 'InvalidCurrency' = 'InvalidCurrency'
	private constructor(value: unknown) {
		super(`${value} is invalid currency value`)
	}

	public static of(value: unknown) {
		return new InvalidCurrencyError(value);
	}
}

export type FareError = InvalidFareAmountError | InvalidCurrencyError

type Constuctor<T> = (value: unknown) => E.Either<FareError, T>

const isAmount = (n: unknown): n is Amount => typeof n === 'number' && isPositiveInteger(n)
const amountFromNumber: Constuctor<Amount> = E.fromPredicate(isAmount, (val) => InvalidFareAmountError.of(val))

const isCurrency = (s: unknown): s is Currency => typeof s === 'string' && isNonEmptyString(s)
const currencyFromString: Constuctor<Currency> = E.fromPredicate(isCurrency, (val) => InvalidCurrencyError.of(val))

const parseFare = A.sequenceS(E.Apply)

export const forCurrency = (currency: string) => (amount: number) => {
	return parseFare({
		amount: amountFromNumber(amount),
		currency: currencyFromString(currency)
	});
}