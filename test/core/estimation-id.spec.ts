import * as EstimationId from "../../src/core/estimation-id"
import * as E from 'fp-ts/Either'

describe('estimation id', () => {
    it('should parse valid uuid', () => {
        const rawId = '868f0702-9037-4ffb-b3b9-9246b4270748';
        const id = EstimationId.fromString(rawId)
        expect(E.right(rawId)).toStrictEqual(id)
    })

    it('should not parse invalid uuid', () => {
        const rawId = '868f0702-9037-4ffb-b3b9';
        const id = EstimationId.fromString(rawId)
        expect(E.left(EstimationId.InvalidEstimationIdError.default())).toStrictEqual(id)
    })
})