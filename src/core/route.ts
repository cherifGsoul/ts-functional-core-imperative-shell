import { Address, AddressInput, toAddress } from "./address"
import * as A from "fp-ts/lib/Apply";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

// Route
export type Route = {
	origin: Address,
	destination: Address
}

export type RouteInput = {
	origin: AddressInput,
	destination: AddressInput
}

export const parseRoute = A.sequenceS(E.Apply)

export const aRouteBetween = (input: RouteInput) => pipe(
	parseRoute({
		origin: toAddress({street: input.origin.street, city: input.origin.city}),
		destination: toAddress({street: input.destination.street, city: input.destination.city}),
	}),
	E.map(props => ({...props}))
)