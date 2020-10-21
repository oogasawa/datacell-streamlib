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
exports.Reduce = void 0;
var stream_1 = require("stream");
var Reduce = /** @class */ (function (_super) {
    __extends(Reduce, _super);
    // tail: string;
    function Reduce(initFunc, func, options) {
        var _this = _super.call(this, __assign(__assign({}, options), { readableObjectMode: true, writableObjectMode: true })) || this;
        _this.initFunc = initFunc;
        _this.func = func;
        _this.result = null;
        return _this;
    }
    Reduce.prototype._transform = function (chunk, encoding, callback) {
        if (this.result === null) {
            this.result = this.initFunc();
        }
        this.result = this.func(chunk, this.result);
        callback();
    };
    Reduce.prototype._flush = function (callback) {
        this.push(this.result);
        callback();
    };
    return Reduce;
}(stream_1.Transform));
exports.Reduce = Reduce;
