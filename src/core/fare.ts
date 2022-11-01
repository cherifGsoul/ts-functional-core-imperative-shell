import { NotEmptyString } from "./not-empty-string";
import { PositiveInteger } from "./positive-integer"

export type Fare = {
	cents: NotEmptyString,
	currency: NotEmptyString
}

export const fromCents = (cents: NotEmptyString | PositiveInteger, currency: NotEmptyString): Fare => {
	const centsFromString = Number(String(cents))
	if (!Number.isInteger(centsFromString)) {
		throw new Error('Amount must be integer like value');
	}
	return {
		cents: String(cents),
		currency: currency
	}
}
