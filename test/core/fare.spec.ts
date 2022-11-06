import * as F from "../../src/core/fare"
import { pipe } from 'fp-ts/lib/function';
import { right } from "fp-ts/lib/Either";

describe('fare', () => {
	it('should parse valid fare', () => {
		const cadAmount = F.forCurrency('CAD')

		expect(pipe(
			100,
			F.forCurrency('CAD')
		)).toStrictEqual(right({ amount: 100, currency: 'CAD' }))
	})
})