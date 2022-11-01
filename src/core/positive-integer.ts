export type PositiveInteger = Readonly<number>

export const fromNumber = (n: number): PositiveInteger => {
	if (!Number.isInteger(n)) {
		throw new Error('Number must be positive integer')
	}

	if (n < 0) {
		throw new Error('Number must be positive integer')
	}

	return n;
}