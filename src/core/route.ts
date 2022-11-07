import { Address } from "."
import * as E from "fp-ts/lib/Either";
import * as A from 'fp-ts/lib/Apply';

export type Route = Readonly<{
    origin: Address.Address,
    destination: Address.Address,
}>

export const between = A.sequenceS(E.Apply)