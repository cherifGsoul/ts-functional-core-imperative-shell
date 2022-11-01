import { Fare, Itinerary, Route, ServedCity } from "."
import { EstimationId } from "./estimation-id"

export type Estimation = {
	id: EstimationId,
	itinerary: Itinerary.Itinerary
	fare: Fare.Fare
}



export type GetServedCity = (city: string) =>  Promise<ServedCity.ServedCity>

export type GetItinerary = (route: Route.Route) => Promise<Itinerary.Itinerary>

export const estimateFor = (itinerary: Itinerary.Itinerary) => {
	
}
