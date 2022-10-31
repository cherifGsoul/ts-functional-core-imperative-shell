import { Address, Itinerary, Route } from "../core";
import { GetServedCity } from "../core/estimation";

export type Estimate = (command: EstimationCommand) => Promise<string>

export type EstimationCommand = {
    route: EstimationCommandRoute
}

export type EstimationCommandRoute = {
    from: {
        street: string,
        city :string
    },
    to: {
        street: string,
        city :string
    }
}
// The use case
export const estimateRide = (getServedCity: GetServedCity): Estimate => async (command: EstimationCommand):  Promise<string> => {
    const route = await toRoute(getServedCity, command.route);
    const itenerary = await toItinerary(route);
};

const toAddress = async (getServedCity: GetServedCity, commandRoute: EstimationCommandRoute): Promise<Address.Address> {
    const city = await getServedCity(commandRoute.from.city);
    return {
        street:commandRoute.from.street,
        city
    }
}

const toRoute = async (getServedCity: GetServedCity, commandRoute: EstimationCommandRoute): Promise<Route.Route> => {
    const origin = await toAddress(getServedCity, commandRoute);
    const destination = await toAddress(getServedCity, commandRoute);
    return Route.between(origin, destination);
}

const toItinerary = async (getItinerary: GetItinerary): Promise<Itinerary> => {
    
}