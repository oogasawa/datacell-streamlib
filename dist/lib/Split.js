"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Split = void 0;
const stream_1 = require("stream");
class Split extends stream_1.Transform {
    constructor(re = /\n/, options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.re = re;
        this.tail = '';
    }
    _transform(chunk, encoding, callback) {
        const chunkStr = (this.tail + chunk);
        const matchedPos = chunkStr.search(this.re);
        if (matchedPos >= 0) {
            const pieces = chunkStr.split(this.re);
            for (let i = 0; i < pieces.length - 1; i++) {
                this.push(pieces[i]);
            }
            this.tail = pieces[pieces.length - 1];
        }
        else {
            this.tail = chunkStr;
        }
        callback();
    }
    _flush(callback) {
        this.push(this.tail);
        callback();
    }
}
exports.Split = Split;
