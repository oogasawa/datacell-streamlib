"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = void 0;
const stream_1 = require("stream");
class Sort extends stream_1.Transform {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { readableObjectMode: true, writableObjectMode: true }));
        this.dataSet = [];
        this.comparator = (a, b) => {
            if (a > b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    _transform(chunk, encoding, callback) {
        this.dataSet.push(chunk.toString());
        callback();
    }
    _flush(callback) {
        this.dataSet
            .sort(this.comparator)
            .forEach((elem) => {
            this.push(elem);
        });
        callback();
    }
}
exports.Sort = Sort;
