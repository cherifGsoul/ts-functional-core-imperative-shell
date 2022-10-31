import { Itinerary, Route } from "../../src/core";

const itineraries: WeakMap<Route.Route, Itinerary.Itinerary> = new WeakMap()

export const addItinerary = async (itinerary: Itinerary.Itinerary): Promise<void> => {
    itineraries.set(itinerary.route, iti)
}


