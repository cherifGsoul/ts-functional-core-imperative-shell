"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateRide = void 0;
const core_1 = require("../core");
// The use case
const estimateRide = (getServedCity) => (command) => __awaiter(void 0, void 0, void 0, function* () {
    const route = yield toRoute(getServedCity, command.route);
    const itenerary = yield toItinerary(route);
});
exports.estimateRide = estimateRide;
const toAddress = (getServedCity, commandRoute) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield getServedCity(commandRoute.from.city);
    return {
        street: commandRoute.from.street,
        city
    };
});
const toRoute = (getServedCity, commandRoute) => __awaiter(void 0, void 0, void 0, function* () {
    const origin = yield toAddress(getServedCity, commandRoute);
    const destination = yield toAddress(getServedCity, commandRoute);
    return core_1.Route.between(origin, destination);
});
const toItinerary = (getItinerary) => __awaiter(void 0, void 0, void 0, function* () {
});
