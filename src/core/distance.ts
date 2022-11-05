import { Distance, NonEmptyString, PositiveInteger } from ".";

export type Distance = Readonly<{
    value: PositiveInteger.PositiveInteger,
    unit: NonEmptyString.NotEmptyString
}>

export const fromMeters = (meters: PositiveInteger.PositiveInteger): Distance => {
    return Object.assign(Object.create(null), {
        value: meters,
        unit: 'meter'
    })
}

export const minus = (distance: Distance, sub: Distance): Distance => {
    if (distance.unit !== sub.unit) {
        throw new Error('Distances must be the same unit');
    }
    const newValue = distance.value - sub.value
    return Object.assign(Object.create(null), {
        value: newValue,
        unit: distance.unit
    })

}

export function toKm(distance: Distance): Distance {
    return Object.assign(Object.create(null), {
        value: distance.value/1000,
        unit: 'KM'
    })
}

