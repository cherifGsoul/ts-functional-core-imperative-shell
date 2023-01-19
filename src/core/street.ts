import * as E from "fp-ts/lib/Either";
import { iso, Newtype } from "newtype-ts";
import * as NES from "newtype-ts/lib/NonEmptyString";
import { isNonEmptyString } from "./predicates";
import 'monocle-ts'
// Street address
export type Street = Newtype<{readonly Street: unique symbol},  NES.NonEmptyString>
export const isoAddress = iso<Street>()

export const streetFromString  = E.fromPredicate(isNonEmptyString<Street>, (val) => new Error('Invalid street'))
export const toString = (street: Street): NES.NonEmptyString => isoAddress.unwrap(street)