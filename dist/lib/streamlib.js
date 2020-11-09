"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToArray = exports.getAsyncMap = exports.getAsyncFilter = void 0;
var Map_1 = require("./Map");
Object.defineProperty(exports, "Map", { enumerable: true, get: function () { return Map_1.Map; } });
var Filter_1 = require("./Filter");
Object.defineProperty(exports, "Filter", { enumerable: true, get: function () { return Filter_1.Filter; } });
var Reduce_1 = require("./Reduce");
Object.defineProperty(exports, "Reduce", { enumerable: true, get: function () { return Reduce_1.Reduce; } });
var Split_1 = require("./Split");
Object.defineProperty(exports, "Split", { enumerable: true, get: function () { return Split_1.Split; } });
var Unique_1 = require("./Unique");
Object.defineProperty(exports, "Unique", { enumerable: true, get: function () { return Unique_1.Unique; } });
var Sort_1 = require("./Sort");
Object.defineProperty(exports, "Sort", { enumerable: true, get: function () { return Sort_1.Sort; } });
var parallel_transform_1 = __importDefault(require("parallel-transform"));
function getAsyncFilter(concurrency, func, options) {
    if (options === void 0) { options = {}; }
    return parallel_transform_1.default(concurrency, options, function (chunk, done) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!chunk) {
                            return [2 /*return*/, done()];
                        }
                        return [4 /*yield*/, func(chunk)];
                    case 1:
                        if (_a.sent()) {
                            this.push(chunk);
                        }
                        done();
                        return [2 /*return*/];
                }
            });
        });
    });
}
exports.getAsyncFilter = getAsyncFilter;
function getAsyncMap(concurrency, func, options) {
    if (options === void 0) { options = {}; }
    return parallel_transform_1.default(concurrency, options, function (chunk, done) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!chunk) {
                            return [2 /*return*/, done()];
                        }
                        _a = this.push;
                        return [4 /*yield*/, func(chunk)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        done();
                        return [2 /*return*/];
                }
            });
        });
    });
}
exports.getAsyncMap = getAsyncMap;
// export function getUnorderedAsyncFilter(
//     concurrency: number,
//     func: Function,
//     options = {}): Transform {
//     return new UnorderedParallelStream(
//         concurrency,
//         async (chunk, enc, push, done) => {
//             if (!chunk) {
//                 return done();
//             }
//             if (await func(chunk)) {
//                 push(chunk);
//             }
//             done();
//         },
//         options);
// }
// export function getUnorderedAsyncMap(
//     concurrency: number,
//     func: (arg: Buffer) => Promise<Buffer>,
//     options = {}): Transform {
//     return new UnorderedParallelStream(
//         concurrency,
//         async (chunk, enc, push, done) => {
//             if (!chunk) {
//                 push(null);
//                 return done();
//             }
//             push(await func(chunk));
//             done();
//         },
//         options);
// }
/** Converts a Readable stream into a string array.
 *
 * @param r_stream A Readable stream.
 * @return A Promise of a string array.
 */
function streamToArray(r_stream) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var result = [];
        var chunk;
        r_stream
            .on('readable', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, r_stream.read()];
                    case 1:
                        if (!((chunk = _a.sent()) != null)) return [3 /*break*/, 2];
                        result.push(chunk.toString());
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        }); })
            .on('end', function () {
            resolve(result);
        })
            .on('error', function () {
            reject();
        });
    });
}
exports.streamToArray = streamToArray;
