"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const stream_1 = require("stream");
class Filter extends stream_1.Transform {
    // tail: string;
    constructor(func, options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.func = func;
    }
    _transform(chunk, encoding, callback) {
        if (this.func(chunk)) {
            this.push(chunk);
        }
        callback();
    }
    _flush(callback) {
        this.push(null);
        callback();
    }
}
exports.Filter = Filter;
