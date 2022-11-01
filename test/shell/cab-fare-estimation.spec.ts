import {EstimationCommandRoute, EstimationCommand, estimateRide }  from '../../src/shell';
import {ServedCity} from '../../src/core'
import * as cities from "./fake-served-cities";
import { getItinerary } from './fake-itinerary-service';

// Min base fee $ 4.5 for the first kilometer
// for each additional KM a $ 1.7 must be added

describe('Cab fare estimation', () => {
    let city: string;
    let estimate: Function;

    beforeEach(async () => {
        // Given Montreal is a served city
        city = await cities.serveCity(ServedCity.of('Montreal')); // Served Cities context
        estimate = estimateRide(cities.getServedCity, getItinerary);
    });
    it('should estimate a cab fare for a route in a served city', async () => {
        // Given a route between "My address" in the city of "Montreal" and the "Montreal-Trudeau Intl Airport" in the city of "Montreal"
        const route: EstimationCommandRoute = {
            from: {
                street: 'My address',
                city
            },
            to: {
                street: 'Montreal-Trudeau Intl Airport',
                city
            } 
        };
        const estimationCommand: EstimationCommand = {route};
        // And the itinerary distance for this route is 25 KM
        const fare = await estimate(estimationCommand);
        expect(fare).toEqual('$45.3');
    })
})