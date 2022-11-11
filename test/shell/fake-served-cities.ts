import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { GetServedCity } from "../../src/core/estimation";
import * as ServedCity from "../../src/core/served-city";

const cities: Map<string, ServedCity.ServedCity> = new Map();

// Not part of the public API
// Cities context handle served cities
export const serveCity = (city: string): void => {
    pipe(
        ServedCity.servedCityFromString(city),
        E.map(c => cities.set(city, c))
    );
}

export const getServedCity: GetServedCity = (city: string): TE.TaskEither<Error, ServedCity.ServedCity> => {
    const servedCity = cities.get(city)
    if (!servedCity) {
        return TE.left(new Error('Invalid city'));
    }
    return TE.right(servedCity);
}

