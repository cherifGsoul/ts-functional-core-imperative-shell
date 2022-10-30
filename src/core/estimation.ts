import { ServedCity } from "."

export type GetServedCity = (city: string) =>  Promise<ServedCity.ServedCity>