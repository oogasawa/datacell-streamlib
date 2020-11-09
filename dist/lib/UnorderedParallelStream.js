"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnorderedParallelStream = void 0;
var stream_1 = require("stream");
// Node.js Design Patterns - Third Edition
// by Luciano Mammino; Mario Casciaro Published by Packt Publishing, 2020 
var UnorderedParallelStream = /** @class */ (function (_super) {
    __extends(UnorderedParallelStream, _super);
    function UnorderedParallelStream(concurrency, userTransform, opts) {
        var _this = _super.call(this, __assign({ objectMode: true }, opts)) || this;
        _this.concurrency = concurrency;
        _this.userTransform = userTransform;
        _this.running = 0;
        _this.continueCb = null;
        _this.terminateCb = null;
        return _this;
    }
    UnorderedParallelStream.prototype._transform = function (chunk, enc, done) {
        this.running++;
        this.userTransform(chunk, enc, this.push.bind(this), this._onComplete.bind(this));
        if (this.running < this.concurrency) {
            done();
        }
        else {
            this.continueCb = done;
        }
        done();
    };
    UnorderedParallelStream.prototype._flush = function (done) {
        if (this.running > 0) {
            this.terminateCb = done;
        }
        else {
            done();
        }
    };
    UnorderedParallelStream.prototype._onComplete = function (err) {
        this.running--;
        if (err) {
            return this.emit('error', err);
        }
        var tmpCb = this.continueCb;
        this.continueCb = null;
        tmpCb && tmpCb();
        if (this.running === 0) {
            this.terminateCb && this.terminateCb();
        }
    };
    return UnorderedParallelStream;
}(stream_1.Transform));
exports.UnorderedParallelStream = UnorderedParallelStream;
