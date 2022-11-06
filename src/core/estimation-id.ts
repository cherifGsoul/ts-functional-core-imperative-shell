import * as E  from "fp-ts/lib/Either";
import { validate } from "uuid";

import {Newtype} from 'newtype-ts'

const isUuid = (s: unknown): s is EstimationId => typeof s === 'string' && validate(s)

export type EstimationId = Newtype<{readonly EstimaionId: unique symbol}, string>

type Constructor<T> = (value: unknown) => E.Either<EstimationIdParsingError, T>

export class InvalidEstimationIdError extends TypeError {

    private constructor(public _tag: 'InvalidEstimationIdError' = 'InvalidEstimationIdError') {
        super('EstimationId must be a valid UUID')
    }

    public static fromMessage(message: string) {
        const error =  new InvalidEstimationIdError();
        error.message = 'message';
        return message;
    }

    public static default() {
        return new InvalidEstimationIdError()
    }
}

export type EstimationIdParsingError = InvalidEstimationIdError

export const fromString: Constructor<EstimationId> = E.fromPredicate( isUuid, () => InvalidEstimationIdError.default());

