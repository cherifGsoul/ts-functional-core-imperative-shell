"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.of = void 0;
const of = (s) => {
    const valid = typeof s === 'string' && s.length > 0;
    if (!valid) {
        throw new Error('Invalid city');
    }
    return s;
};
exports.of = of;
