import {EstimationCommandRoute, EstimationCommand, estimateRide }  from '../../src/shell';
import {Distance, Itinerary, Route, ServedCity} from '../../src/core'
import * as cities from "./fake-served-cities";
import { addItinerary, getItinerary } from './fake-itinerary-service';

// Min base fee $ 4.5 for the first kilometer
// for each additional KM a $ 1.7 must be added

describe('Cab fare estimation', () => {
    let city: string = 'Montreal';
    let estimate: Function;
    let availableRoute: Route.Route;

    beforeEach(async () => {
        // Given Montreal is a served city
        city = await cities.serveCity(ServedCity.of(city)); // Served Cities context
        availableRoute = Route.between({
            street: 'My address',
            city
        },
        {
            street: 'Montreal-Trudeau Intl Airport',
            city
        })
        const itinerary: Itinerary.Itinerary = {
            route: availableRoute,
            distance: Distance.fromMeters(25000)
        }
        await addItinerary(itinerary)
        estimate = estimateRide(cities.getServedCity, getItinerary);
    });
    it('should estimate a cab fare for a route in a served city', async () => {
        // Given a route between "My address" in the city of "Montreal" and the "Montreal-Trudeau Intl Airport" in the city of "Montreal"
        const route: EstimationCommandRoute = Object.assign(Object.create(null), {
            origin: availableRoute.origin,
            destination: availableRoute.destination
        });
        const estimationCommand: EstimationCommand = Object.assign(Object.create(null), {route});
        // And the itinerary distance for this route is 25 KM
        const fare = await estimate(estimationCommand);
        expect(fare).toEqual('CAD 45.3');
    })
})