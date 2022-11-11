import * as Itinerary  from "../../src/core/itinerary";
import * as Route from "../../src/core/route";
import { GetItinerary } from "../../src/core/estimation";
import * as TE from "fp-ts/lib/TaskEither";

const itineraries:Set<Itinerary.Itinerary> = new Set()

export const addItinerary = async (itinerary: Itinerary.Itinerary): Promise<void> => {
    itineraries.add(itinerary)
}

// export const getItinerary: GetItinerary = async (route: Route.Route): TE.TaskEither<Error, Itinerary.Itinerary> => {
//     const itinerary = Array.from(itineraries).find((itinerary: Itinerary.Itinerary) => {
//         return Route.equals(itinerary.route, route)
//     });
//     if (!itinerary) {
//         throw new Error('an itinerary for this route can not be found');
//     }
//     return itinerary;
// } 
