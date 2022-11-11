import * as E from "fp-ts/lib/Either";
import { Newtype } from "newtype-ts";
import * as NES from "newtype-ts/lib/NonEmptyString";
import { isNonEmptyString } from "./predicates";

// City address
export type ServedCity = Newtype<{readonly ServedCity: unique symbol}, NES.NonEmptyString>
export const servedCityFromString = E.fromPredicate(isNonEmptyString<ServedCity>, (val) => new Error('Invalid city'))