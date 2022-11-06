import { pipe } from "fp-ts/lib/function";
import { Distance, Estimation, Fare, Itinerary, Route, ServedCity } from "."
import * as NES from './not-empty-string'
import * as EstimationId from "./estimation-id";
import { forCurrency } from "./fare";
import * as E from "fp-ts/lib/Either";

const BASE_FARE = 170
const MINIMUM_FARE = 450

export type Estimation = {
	id: EstimationId.EstimationId,
	itinerary: Itinerary.Itinerary
	fare: Fare.Fare
}

export type GetServedCity = (city: string) =>  Promise<ServedCity.ServedCity>

export type GetItinerary = (route: Route.Route) => Promise<Itinerary.Itinerary>

export const estimateFor = (itinerary: Itinerary.Itinerary): unknown => {
	// const baseFare = Fare.fromCents(PositiveInteger.fromNumber(BASE_FARE), NonEmptyString.fromString('CAD'))
	// const minimumFare = Fare.fromCents(PositiveInteger.fromNumber(MINIMUM_FARE), NonEmptyString.fromString('CAD'))
	// const restDistance = Distance.minus(itinerary.distance, Distance.fromMeters(1000));
	// const restDistanceFare = Fare.multiply(Distance.toKm(restDistance).value, baseFare)
	// const fare = Fare.add(minimumFare, restDistanceFare);
	// return Object.assign(Object.create(null), {
	// 	id: EstimationId.generate(),
	// 	itinerary,
	// 	fare
	// });
	return {}

}

const toBaseFare = () => {
	return pipe(
		BASE_FARE,
		forCurrency('CAD')
	)
}
