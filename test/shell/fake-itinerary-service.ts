import { Itinerary, Route } from "../../src/core";
import { GetItinerary } from "../../src/core/estimation";

const itineraries: WeakMap<Route.Route, Itinerary.Itinerary> = new WeakMap()

export const addItinerary = async (itinerary: Itinerary.Itinerary): Promise<void> => {
    itineraries.set(itinerary.route, itinerary)
}

export const getItinerary: GetItinerary = async (route: Route.Route): Promise<Itinerary.Itinerary> => {
    const itinerary = itineraries.get(route);
    if (!itinerary) {
        throw new Error('Itinerary not found');
    }
    return itinerary;
} 
