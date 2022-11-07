import * as TE from "fp-ts/lib/TaskEither";
import { ServedCity } from "../../src/core";
import { GetServedCity } from "../../src/core/estimation";

const cities: Set<string> = new Set();

// Not part of the public API
// Cities context handle served cities
export const serveCity = async (city: string): Promise<string> => {
    cities.add(city);
    return city;
}

export const getServedCity: GetServedCity = (city: string): TE.TaskEither<ServedCity.ServedCityError, ServedCity.ServedCity> => {
    const found = Array.from(cities.values()).find((aCity: string) => city === aCity);
    if (!found) {
        return TE.left(ServedCity.InvalidServedCityError.of(city));
    }
    return TE.fromEither(ServedCity.of(found));
}

