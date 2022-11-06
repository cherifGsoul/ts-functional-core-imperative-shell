import * as E from "fp-ts/lib/Either";

export type ServedCity = Readonly<string>

export const of = (s: string): E.Either<string, ServedCity> => {
    const valid = typeof s === 'string' && s.length > 0;
    if (!valid) {
        return E.left('Invalid city');
    }
    return E.right(s);
}

export const equals = (city: ServedCity, other: ServedCity): Boolean => {
    return city === other;
}
