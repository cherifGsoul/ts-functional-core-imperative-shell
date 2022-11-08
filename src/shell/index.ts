import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { Address, Estimation, Fare, Itinerary, Route, ServedCity } from "../core";
import { GetItinerary, GetServedCity } from "../core/estimation";
import * as A from 'fp-ts/lib/Apply';

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
export const estimateRide = (getServedCity: GetServedCity, getItinerary: GetItinerary) => (command: EstimationCommand):  TE.TaskEither<Error, Address.Address> => {
    // const route = await toRoute(getServedCity, command.route);
    // const itinerary = await toItinerary(getItinerary, route);
    // const estimation =  Estimation.estimateFor(itinerary);
    // return Fare.format(estimation.fare);

    return toAddress(getServedCity)(command.route.origin)
};

export const toAddress = (getServedCity: GetServedCity) => (commandAddress: EstimationCommandRouteAddress): /*E.Either<Error, Address.Address>*/ void  => {
    const city = getServedCity(commandAddress.city)
    pipe(
        Address.parseAddress({
            address: 
        })
    )
    // const servedCity = getServedCity(commandAddress.city)
    // Address.parseAddress({
    //     street: Address.streetFromString(commandAddress.street),
    //     city: servedCity
    // })
}

// const toRoute = async (getServedCity: GetServedCity, commandRoute: EstimationCommandRoute): Promise<Route.Route> => {
//     const origin = await toAddress(getServedCity, commandRoute.origin);
//     const destination = await toAddress(getServedCity, commandRoute.destination);
//     return Route.between(origin, destination);
// }

// const toItinerary = async (getItinerary: GetItinerary, route: Route.Route): Promise<Itinerary.Itinerary> => {
//     try {
//         return await getItinerary(route)
//     } catch (error) {
//         throw new Error('Itineraty can not be found')
//     }
// }