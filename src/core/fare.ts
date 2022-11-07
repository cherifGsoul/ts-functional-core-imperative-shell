import * as NotEmptyString from "./not-empty-string";
import { PositiveInteger } from "./positive-integer";

export type Fare = {
  cents: NotEmptyString.NotEmptyString;
  currency: NotEmptyString.NotEmptyString;
};

export const fromCents = (
  cents: NotEmptyString.NotEmptyString | PositiveInteger,
  currency: NotEmptyString.NotEmptyString
): Fare => {
  const centsFromString = Number(String(cents));
  if (!Number.isInteger(centsFromString)) {
    throw new Error("Amount must be integer like value");
  }
  return Object.assign(Object.create(null), {
    cents: String(cents),
    currency: currency,
  });
};

export const isTheSameCurrency = (fare: Fare, other: Fare) => {
  return NotEmptyString.equals(fare.currency, other.currency);
};

export const add = (fare: Fare, other: Fare) => {
  if (!isTheSameCurrency(fare, other)) {
    throw new Error("Only fare with same currency can be added");
  }
  const sum = Number.parseInt(fare.cents) + Number.parseInt(other.cents);
  return fromCents(sum, other.currency);
};
export const multiply = (multiplier: number, fare: Fare): Fare => {
  if (multiplier === 0) {
    throw new Error("Fare can not be multiplied by zero");
  }
  console.log(multiplier, fare.cents);
  const newCents = multiplier * Number.parseInt(fare.cents);
  return fromCents(newCents, fare.currency);
};

export const format = (fare: Fare): string => {
  const dollars = Number.parseInt(fare.cents) / 100;
  return `${fare.currency} ${dollars}`;
};
