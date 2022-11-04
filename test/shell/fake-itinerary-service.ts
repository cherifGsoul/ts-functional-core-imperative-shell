import { Itinerary, Route } from "../../src/core";
import { GetItinerary } from "../../src/core/estimation";

const itineraries:Set<Itinerary.Itinerary> = new Set()

export const addItinerary = async (itinerary: Itinerary.Itinerary): Promise<void> => {
    itineraries.add(itinerary)
}

export const getItinerary: GetItinerary = async (route: Route.Route): Promise<Itinerary.Itinerary> => {
    const itinerary = Array.from(itineraries).find((itinerary: Itinerary.Itinerary) => {
        return Route.equals(itinerary.route, route)
    });
    if (!itinerary) {
        throw new Error('an itinerary for this route can not be found');
    }
    return itinerary;
} 
