"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnorderedParallelStream = void 0;
const stream_1 = require("stream");
// Node.js Design Patterns - Third Edition
// by Luciano Mammino; Mario Casciaro Published by Packt Publishing, 2020 
class UnorderedParallelStream extends stream_1.Transform {
    constructor(concurrency, userTransform, opts) {
        super(Object.assign({ objectMode: true }, opts));
        this.concurrency = concurrency;
        this.userTransform = userTransform;
        this.running = 0;
        this.continueCb = null;
        this.terminateCb = null;
    }
    _transform(chunk, enc, done) {
        this.running++;
        this.userTransform(chunk, enc, this.push.bind(this), this._onComplete.bind(this));
        if (this.running < this.concurrency) {
            done();
        }
        else {
            this.continueCb = done;
        }
        done();
    }
    _flush(done) {
        if (this.running > 0) {
            this.terminateCb = done;
        }
        else {
            done();
        }
    }
    _onComplete(err) {
        this.running--;
        if (err) {
            return this.emit('error', err);
        }
        const tmpCb = this.continueCb;
        this.continueCb = null;
        tmpCb && tmpCb();
        if (this.running === 0) {
            this.terminateCb && this.terminateCb();
        }
    }
}
exports.UnorderedParallelStream = UnorderedParallelStream;
