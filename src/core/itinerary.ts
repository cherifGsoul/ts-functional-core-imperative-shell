import * as A from "fp-ts/lib/Apply";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Distance, distanceFrom } from "./distance";
import { aRouteBetween, Route, RouteInput } from "./route";

export type Itinerary = {
	route: Route,
	distance: Distance
}

const parseItinerary = A.sequenceS(E.Apply)

export const itineraryFrom = ({route, distance}: {route: RouteInput, distance: number}) => pipe(
	parseItinerary({
		route: aRouteBetween(route),
		distance: distanceFrom(distance)
	}),
	E.map(props => ({...props}))
)
