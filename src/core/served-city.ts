export type ServedCity = Readonly<string>

export const of = (s: string): ServedCity => {
    const valid = typeof s === 'string' && s.length > 0;
    if (!valid) {
        throw new Error('Invalid city');
    }
    return s;
}