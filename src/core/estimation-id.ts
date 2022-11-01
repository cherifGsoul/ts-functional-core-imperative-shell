import { v4, validate } from "uuid";

export type EstimationId = Readonly<string>

export const fromString = (id: string) => {
	const valid = validate(id);
    if (!valid) {
        throw new Error('Invalid city');
    }
    return id;
}

export const generate = () => v4();