import { ServedCity, servedCityFromString } from "./served-city"
import { Street, streetFromString } from "./street"
import * as A from "fp-ts/lib/Apply";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

// Address
export type Address = {
	street: Street,
	city: ServedCity
}

export const parseAddress = A.sequenceS(E.Apply)

export type AddressInput = Readonly<{
	street: string,
	city: string
}>

export const toAddress = (input: AddressInput) => {
	return pipe(
		parseAddress({
			street: streetFromString(input.street),
			city: servedCityFromString(input.city)
		}),
		E.map(props =>({...props}))
	)
}