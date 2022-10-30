import { GetServedCity } from "../core/estimation"

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
export const estimateRide = (getServedCity: GetServedCity) => async (command: EstimationCommand):  Promise<string> => {
    const route = await toRoute(getServedCity, command.route);
    const itenerary = await toItinerary(route);
};

const toRoute = (getServedCity: GetServedCity, commandRoute: EstimationCommandRoute) => {

}