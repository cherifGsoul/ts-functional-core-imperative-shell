import { Address } from ".";
export declare type Route = Readonly<{
    origin: Address.Address;
    destination: Address.Address;
}>;
export declare const between: (origin: Address.Address, destination: Address.Address) => Route;
