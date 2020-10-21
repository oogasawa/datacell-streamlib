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
exports.Unique = void 0;
var stream_1 = require("stream");
var Unique = /** @class */ (function (_super) {
    __extends(Unique, _super);
    // tail: string;
    function Unique(options) {
        var _this = _super.call(this, __assign(__assign({}, options), { readableObjectMode: true, writableObjectMode: true })) || this;
        _this.dataSet = new Set();
        return _this;
    }
    Unique.prototype._transform = function (chunk, encoding, callback) {
        this.dataSet.add(chunk.toString());
        callback();
    };
    Unique.prototype._flush = function (callback) {
        var _this = this;
        this.dataSet.forEach(function (elem) {
            _this.push(elem);
        });
        callback();
    };
    return Unique;
}(stream_1.Transform));
exports.Unique = Unique;
