import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { estimatFor, GetItinerary, GetServedCity } from "../core/estimation";
import * as A from 'fp-ts/lib/Apply';
import { Address, parseAddress } from "../core/address";
import { streetFromString } from "../core/street";
import { servedCityFromString } from "../core/served-city";
import { parseRoute } from "../core/route";
import { parseItinerary } from "../core/itinerary";
import { match } from "assert";
import { either } from "fp-ts";

export type Estimate = (command: EstimationCommand) => Promise<string>

export type EstimationCommand = {
    origin: EstimationCommandRouteAddress,
    destination: EstimationCommandRouteAddress
}

export type EstimationCommandRouteAddress = {
    street: string,
    city: string
}

// The use case
export const estimateRide = (getServedCity: GetServedCity, getItinerary: GetItinerary) => (command: EstimationCommand) => {
    const f = toAddress(getServedCity)
    console.log(typeof f(command.origin))
    return f(command.origin)
};

export const toAddress = (getServedCity: GetServedCity) => (input: EstimationCommandRouteAddress): TE.TaskEither<Error, Address> => {
	return pipe(
        getServedCity(input.city),
        TE.match(
            (e) => {throw e},
            (city) => {
                return parseAddress({
                    street: streetFromString(input.street),
                    city: E.right(city)
                })
            }
        ),
        TE.map(props => ({...props}))
	)
}

// const toRoute = (getServedCity: GetServedCity) => (input: EstimationCommand) => pipe(
// 	parseRoute({
// 		origin: toAddress(input.origin),
// 		destination: toAddress(input.destination),
// 	}),
// 	E.map(props => ({...props}))
// )

// const toItinerary = (getItinerary: GetItinerary) => (commandRoute: EstimationCommand) => pipe(
//     toRoute(commandRoute),
//     TE.fromEither,
//     TE.map(getItinerary),
// )
