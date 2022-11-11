import { pipe } from "fp-ts/lib/function"
import * as Distance from "./distance"
import * as Itinerary from "./itinerary"
import * as ServedCity from "./served-city"
import * as Route from "./route"
import { TaskEither } from "fp-ts/lib/TaskEither";

export const estimatFor = (itinerary: Itinerary.Itinerary) => {
	return pipe(
		itinerary.distance,
		Distance.minus(Distance.isoDistance.wrap(1)),
		toRestDistanceFare(170),
		withFirstKmFare(450),
		toEstimation(itinerary)
	)
}

const toRestDistanceFare = (baseFare: number) => (distance: Distance.Distance) => Distance.isoDistance.unwrap(distance) * baseFare
const withFirstKmFare = (firstKmFare: number) => (restDistanceFare: number) => restDistanceFare + firstKmFare
const toEstimation = (itinerary: Itinerary.Itinerary) => (fare: number) =>({itinerary, fare})

export const formatFare = (fare: number) => fare / 100

export type GetServedCity = (city: string) =>  TaskEither<Error, ServedCity.ServedCity>

export type GetItinerary = (route: Route.Route) => TaskEither<Error, Itinerary.Itinerary>