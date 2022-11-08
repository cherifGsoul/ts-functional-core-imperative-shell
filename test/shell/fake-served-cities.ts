import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { ServedCity } from "../../src/core";
import { GetServedCity } from "../../src/core/estimation";

const cities: Map<string, ServedCity.ServedCity> = new Map();

// Not part of the public API
// Cities context handle served cities
export const serveCity = (city: string): void => {
    pipe(
        ServedCity.of(city),
        E.map(c => cities.set(city, c))
    );
}

export const getServedCity: GetServedCity = (city: string): TE.TaskEither<ServedCity.ServedCityError, ServedCity.ServedCity> => {
    const servedCity = cities.get(city)
    if (!servedCity) {
        return TE.left(ServedCity.InvalidServedCityError.of(city));
    }
    return TE.right(servedCity);
}

