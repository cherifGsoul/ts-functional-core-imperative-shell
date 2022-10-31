import { Itinerary, Route, ServedCity } from "."

export type GetServedCity = (city: string) =>  Promise<ServedCity.ServedCity>

export type GetItinerary = (route: Route.Route) => Itinerary.Itinerary