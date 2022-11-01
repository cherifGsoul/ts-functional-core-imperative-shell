import { Fare, NonEmptyString } from "../../src/core"

describe('fare', () => {
	it('should accept string amount values', () => {
		const fare = Fare.from(NonEmptyString.fromString('1000'), NonEmptyString.fromString('CAD'));
		expect(fare.cents).toBe('1000');
	})
})