import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { estimatFor, formatFare } from "../../src/core/estimation";
import { itineraryFrom } from "../../src/core/itinerary";
import { serveCity } from "../../test/shell/fake-served-cities";

Given('{string} is a served city', async function (city) {
	await serveCity(city)
});

Given('a route between the {string} in the city of {string} and the {string} in the city of {string}', function (originStreet, originCity, destinatinStreet, destinationCity) {
	this.route = {
		origin: {
			street: originStreet, 
			city: originCity
		}, 
		destination: {
			street: destinatinStreet, 
			city: destinationCity
		}
	}
});

Given('the itinerary distance for this route is {float} KM', function (distance) {
	pipe(
		itineraryFrom({
			route: this.route,
			distance,
		}),
		E.match(
			(e) => {this.iteneraryError = e},
			(itinerary) => {this.itinerary = itinerary}
		)
	)
	expect(this.iteneraryError).to.be.undefined
	expect(this.itinerary).to.be.ok
});

When('{string} request for an estimation for this itinerary', function (client) {
	this.estimation = estimatFor(this.itinerary)
});

Then('the quotation estimated fare should be ${float}', function (fare) {
	expect(formatFare(this.estimation.fare)).to.equal(fare)
});