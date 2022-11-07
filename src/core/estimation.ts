import { pipe } from "fp-ts/lib/function";
import { Distance, Estimation, Fare, Itinerary, Route, ServedCity } from "."
import * as EstimationId from "./estimation-id";
import { forCurrency } from "./fare";
import * as E from "fp-ts/lib/Either";
import { EitherT } from "fp-ts/lib/EitherT";
import { TaskEither } from "fp-ts/lib/TaskEither";

const BASE_FARE = 170
const MINIMUM_FARE = 450

export type Estimation = {
	id: EstimationId.EstimationId,
	itinerary: Itinerary.Itinerary
	fare: Fare.Fare
}

export type GetServedCity = (city: string) =>  TaskEither<ServedCity.ServedCityError, ServedCity.ServedCity>

export type GetItinerary = (route: Route.Route) => TaskEither<Itinerary.Itinerary>

export const estimateFor = (): unknown => {
	const baseFare = toBaseFare()
	const minimumFare = toMinimumFare()
	// const restDistance = Distance.minus(itinerary.distance, Distance.fromMeters(1000));
	// const restDistanceFare = Fare.multiply(Distance.toKm(restDistance).value, baseFare)
	// const fare = Fare.add(minimumFare, restDistanceFare);
	// return Object.assign(Object.create(null), {
	// 	id: EstimationId.generate(),
	// 	itinerary,
	// 	fare
	// });
	return toBaseFare()

}

const toBaseFare = () => {
	return pipe(
		BASE_FARE,
		forCurrency('CAD')
	)
}


const toMinimumFare = () => {
	return pipe(
		MINIMUM_FARE,
		forCurrency('CAD')
	)
}
