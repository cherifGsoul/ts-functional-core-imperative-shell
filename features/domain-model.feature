Feature: Cab fare estimation request

	As a cab rider
	In order to know the fare of my trip upfront
	I need to be able to make estimation request

	Rules:
		- Minimum base fee $4.5 for the first kilometer
		- For each additional KM a $ 1.7 must be added
		- The origin and destination Cities must be served

	Scenario: Estimation request for a route with origin and destination in served cities
		Given "Montreal" is a served city
		And a route between the "My address" in the city of "Montreal" and the "Montreal-Trudeau Intl Airport" in the city of "Montreal"
		And the itinerary distance for this route is 25 KM
		When "Cherif" request for an estimation for this itinerary
		Then the quotation estimated fare should be $45.3