import { ServedCity } from "../../src/core";
import { GetServedCity } from "../../src/core/estimation";

const cities: Set<string> = new Set();

// Not part of the public API
// Cities context handle served cities
export const serveCity = async (city: string): Promise<string> => {
    cities.add(city);
    return city;
}

export const getServedCity: GetServedCity = async(city: string): Promise<ServedCity.ServedCity> => {
    const found = Array.from(cities.values()).find((aCity: string) => city === aCity);
    if (!found) {
        throw new Error('City not found');
    }
    return ServedCity.of(found);
}

