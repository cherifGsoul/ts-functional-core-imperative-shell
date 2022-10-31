import { Itinerary, Route, ServedCity } from ".";
export declare type GetServedCity = (city: string) => Promise<ServedCity.ServedCity>;
export declare type GetItinerary = (route: Route.Route) => Itinerary.Itinerary;
