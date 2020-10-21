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
exports.Split = void 0;
var stream_1 = require("stream");
var Split = /** @class */ (function (_super) {
    __extends(Split, _super);
    function Split(re, options) {
        if (re === void 0) { re = /\n/; }
        var _this = _super.call(this, __assign(__assign({}, options), { readableObjectMode: true, writableObjectMode: true })) || this;
        _this.re = re;
        _this.tail = '';
        return _this;
    }
    Split.prototype._transform = function (chunk, encoding, callback) {
        var chunkStr = (this.tail + chunk);
        var matchedPos = chunkStr.search(this.re);
        if (matchedPos >= 0) {
            var pieces = chunkStr.split(this.re);
            for (var i = 0; i < pieces.length - 1; i++) {
                this.push(pieces[i]);
            }
            this.tail = pieces[pieces.length - 1];
        }
        else {
            this.tail = chunkStr;
        }
        callback();
    };
    Split.prototype._flush = function (callback) {
        this.push(this.tail);
        callback();
    };
    return Split;
}(stream_1.Transform));
exports.Split = Split;
