import { iso, Newtype } from "newtype-ts"
import { isPositiveInteger } from "./predicates"
import * as E from "fp-ts/lib/Either";
import 'monocle-ts'

export type Distance = Newtype<{readonly Distance: unique symbol},  number>
export const distanceFrom  = E.fromPredicate(isPositiveInteger<Distance>, (val) => new Error('Invalid distance'))
export const isoDistance = iso<Distance>()

export const minus = (other: Distance) => (distance: Distance) => {
	const distanceN = isoDistance.unwrap(distance)
	const otherN = isoDistance.unwrap(other)
	return isoDistance.wrap(distanceN - otherN)
}

