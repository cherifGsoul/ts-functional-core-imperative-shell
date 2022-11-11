import * as E from "fp-ts/lib/Either";
import { Newtype } from "newtype-ts";
import * as NES from "newtype-ts/lib/NonEmptyString";
import { isNonEmptyString } from "./predicates";

// Street address
export type Street = Newtype<{readonly Street: unique symbol},  NES.NonEmptyString>
export const streetFromString  = E.fromPredicate(isNonEmptyString<Street>, (val) => new Error('Invalid street'))