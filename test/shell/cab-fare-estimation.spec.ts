
// Min base fee $ 4.5 for the first kilometer
// for each additional KM a $ 1.7 must be added

import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/lib/function"
import { parseAddress } from "../../src/core/address"
import { distanceFrom } from "../../src/core/distance"
import { parseRoute } from "../../src/core/route"
import { servedCityFromString } from "../../src/core/served-city"
import { streetFromString } from "../../src/core/street"
import * as Itinerary from "../../src/core/itinerary"
import * as Shell from "../../src/shell"
import { addItinerary, getItinerary } from "./fake-itinerary-service"
import { getServedCity, serveCity } from "./fake-served-cities"
import { match } from "assert"
import { parse } from "path"

describe('Cab fare estimation', () => {
    it('should estimate a cab fare for a route in a served city', async () => {
        // Given "Montreal" is a served city
        const city = "Montreal"
        await serveCity(city)
        // And a route between the "My address" in the city of "Montreal" and the "Montreal-Trudeau Intl Airport" in the city of "Montreal"
        const origin = parseAddress({
            street: streetFromString("My address"),
            city: servedCityFromString(city),
        })

        const destination = parseAddress({
            street: streetFromString("Montreal-Trudeau Intl Airport"),
            city: servedCityFromString(city),
        })
        const route = parseRoute({
            origin,
            destination
        });

        // And the itinerary distance for this route is 25 KM
        const distance = distanceFrom(25)
        const itinerary = Itinerary.parseItinerary({
            route,
            distance
        })

        const res = pipe(
            TE.fromEither(itinerary),
            TE.chain(addItinerary)
        );

        await res();

        // Extract origin from route
        const commandOrigin: Shell.EstimationCommandRouteAddress = pipe(
            route,
            E.map(r => r.origin),
            E.match(
                (e) => {throw e},
                (o: any) => ({...o})
            )
        )

        // Extract destination from route
        const commandDestination: Shell.EstimationCommandRouteAddress = pipe(
            route,
            E.map(r => r.origin),
            E.match(
                (e) => {throw e},
                (d: any) => ({...d})
            ),
        )

        const command: Shell.EstimationCommand = {
            origin: commandOrigin,
            destination: commandDestination,
        }

        const estimate = Shell.estimateRide(getServedCity, getItinerary)
        console.log(await estimate(command))
        const parse = async (n: string) => parseFloat(n)
        const foo = (n: string) => () => pipe(n, parse)
        const n = await foo('5')()
        console.log(typeof n)
    })
})