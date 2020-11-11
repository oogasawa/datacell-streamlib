"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reduce = void 0;
const stream_1 = require("stream");
class Reduce extends stream_1.Transform {
    // tail: string;
    constructor(initFunc, func, options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.initFunc = initFunc;
        this.func = func;
        this.result = null;
    }
    _transform(chunk, encoding, callback) {
        if (this.result === null) {
            this.result = this.initFunc();
        }
        this.result = this.func(chunk, this.result);
        callback();
    }
    _flush(callback) {
        this.push(this.result);
        callback();
    }
}
exports.Reduce = Reduce;
