import { GetServedCity } from "../core/estimation";
export declare type Estimate = (command: EstimationCommand) => Promise<string>;
export declare type EstimationCommand = {
    route: EstimationCommandRoute;
};
export declare type EstimationCommandRoute = {
    from: {
        street: string;
        city: string;
    };
    to: {
        street: string;
        city: string;
    };
};
export declare const estimateRide: (getServedCity: GetServedCity) => Estimate;
