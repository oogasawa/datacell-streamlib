"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = void 0;
const stream_1 = require("stream");
class Unique extends stream_1.Transform {
    // tail: string;
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.dataSet = new Set();
    }
    _transform(chunk, encoding, callback) {
        this.dataSet.add(chunk.toString());
        callback();
    }
    _flush(callback) {
        this.dataSet.forEach((elem) => {
            this.push(elem);
        });
        callback();
    }
}
exports.Unique = Unique;
