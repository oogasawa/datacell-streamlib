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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Split = exports.Reduce = exports.Filter = exports.Map = exports.streamToArray = void 0;
var stream_1 = require("stream");
var log4js = __importStar(require("log4js"));
var logger = log4js.getLogger();
// logger.level = 'warn';
/** Converts a Readable stream into a string array.
 *
 * @param r_stream A Readable stream.
 * @return A Promise of a string array.
 */
function streamToArray(r_stream) {
    return new Promise(function (resolve, reject) {
        var result = [];
        var chunk;
        r_stream
            .on('readable', function () {
            while ((chunk = r_stream.read()) != null) {
                result.push(chunk.toString());
            }
        })
            .on('end', function () {
            resolve(result);
        })
            .on('error', function () {
            reject();
        });
    });
}
exports.streamToArray = streamToArray;
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    // tail: string;
    function Map(func, options) {
        var _this = _super.call(this, __assign(__assign({}, options), { readableObjectMode: true, writableObjectMode: true })) || this;
        _this.func = func;
        return _this;
    }
    Map.prototype._transform = function (chunk, encoding, callback) {
        logger.debug(chunk);
        this.push(this.func(chunk));
        callback();
    };
    Map.prototype._flush = function (callback) {
        this.push(null);
        callback();
    };
    return Map;
}(stream_1.Transform));
exports.Map = Map;
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    // tail: string;
    function Filter(func, options) {
        var _this = _super.call(this, __assign(__assign({}, options), { readableObjectMode: true, writableObjectMode: true })) || this;
        _this.func = func;
        return _this;
    }
    Filter.prototype._transform = function (chunk, encoding, callback) {
        logger.debug(chunk);
        if (this.func(chunk)) {
            this.push(chunk);
        }
        callback();
    };
    Filter.prototype._flush = function (callback) {
        this.push(null);
        callback();
    };
    return Filter;
}(stream_1.Transform));
exports.Filter = Filter;
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
        logger.debug(chunk);
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
        logger.debug(chunk);
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
