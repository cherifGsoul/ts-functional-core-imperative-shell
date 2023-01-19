import * as Itinerary  from "../../src/core/itinerary";
import * as Route from "../../src/core/route";
import { GetItinerary } from "../../src/core/estimation";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";

const itineraries:Set<Itinerary.Itinerary> = new Set()

export const addItinerary = (itinerary: Itinerary.Itinerary): TE.TaskEither<Error, Itinerary.Itinerary> => {
    itineraries.add(itinerary)
    console.log(itinerary)
    return TE.of(itinerary)
}

export const getItinerary: GetItinerary = (route: Route.Route): TE.TaskEither<Error, Itinerary.Itinerary> => {
    const itinerary = Array.from(itineraries).find((itinerary: Itinerary.Itinerary) => {
        return true;
    });
    if (!itinerary) {
        return TE.left(new Error('No itinerary'))
    }
    return TE.right(itinerary)
} 
