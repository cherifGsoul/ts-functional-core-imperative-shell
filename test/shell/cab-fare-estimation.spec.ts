import {EstimationCommandRoute, EstimationCommand, estimateRide }  from '../../src/shell';
import {Address, Distance, Itinerary, Route, ServedCity} from '../../src/core'
import * as cities from "./fake-served-cities";
import { addItinerary, getItinerary } from './fake-itinerary-service';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';

// Min base fee $ 4.5 for the first kilometer
// for each additional KM a $ 1.7 must be added

describe('Cab fare estimation', () => {
    let city: string = 'Montreal';
    let estimate: Function;
    let availableRoute: Route.Route;

    beforeEach(async () => {
        await cities.serveCity(city);
    });
    it('should estimate a cab fare for a route in a served city', async () => {
    })
})