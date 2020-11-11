"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const stream_1 = require("stream");
class Map extends stream_1.Transform {
    // tail: string;
    constructor(func, options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.func = func;
    }
    _transform(chunk, encoding, callback) {
        this.push(this.func(chunk));
        callback();
    }
    _flush(callback) {
        this.push(null);
        callback();
    }
}
exports.Map = Map;
