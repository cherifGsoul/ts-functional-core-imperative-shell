export type NotEmptyString = Readonly<string>

const isNotEmptyString = (s: unknown): s is string => typeof s === 'string' && s.length > 0;

export const fromString = (s: string) => {
	if (!isNotEmptyString(s)) {
		throw new Error('String can not be empty');
	}
	return s;
}