import { Address, Estimation, Fare, Itinerary, Route } from "../core";
import { GetItinerary, GetServedCity } from "../core/estimation";

export type Estimate = (command: EstimationCommand) => Promise<string>

export type EstimationCommand = {
    route: EstimationCommandRoute
}

export type EstimationCommandRoute = {
    origin: EstimationCommandRouteAddress,
    destination: EstimationCommandRouteAddress
}

export type EstimationCommandRouteAddress = {
    street: string,
    city :string
}

// The use case
export const estimateRide = (getServedCity: GetServedCity, getItinerary: GetItinerary): Estimate => async (command: EstimationCommand):  Promise<string> => {
    const route = await toRoute(getServedCity, command.route);
    const itinerary = await toItinerary(getItinerary, route);
    const estimation =  Estimation.estimateFor(itinerary);
    return Fare.format(estimation.fare);
};

const toAddress = async (getServedCity: GetServedCity, commandAddress: EstimationCommandRouteAddress): Promise<Address.Address> => {
    const city = await getServedCity(commandAddress.city);
    return {
        street:commandAddress.street,
        city
    }
}

const toRoute = async (getServedCity: GetServedCity, commandRoute: EstimationCommandRoute): Promise<Route.Route> => {
    const origin = await toAddress(getServedCity, commandRoute.origin);
    const destination = await toAddress(getServedCity, commandRoute.destination);
    return Route.between(origin, destination);
}

const toItinerary = async (getItinerary: GetItinerary, route: Route.Route): Promise<Itinerary.Itinerary> => {
    try {
        return await getItinerary(route)
    } catch (error) {
        throw new Error('Itineraty can not be found')
    }
}