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
var DevNull_1 = require("./DevNull");
Object.defineProperty(exports, "DevNull", { enumerable: true, get: function () { return DevNull_1.DevNull; } });
const parallel_transform_1 = __importDefault(require("parallel-transform"));
function getAsyncFilter(concurrency, func, options = {}) {
    return parallel_transform_1.default(concurrency, options, function (chunk, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!chunk) {
                return done();
            }
            if (yield func(chunk)) {
                this.push(chunk);
            }
            done();
        });
    });
}
exports.getAsyncFilter = getAsyncFilter;
function getAsyncMap(concurrency, func, options = {}) {
    return parallel_transform_1.default(concurrency, options, function (chunk, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!chunk) {
                return done();
            }
            this.push(yield func(chunk));
            done();
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
    return new Promise((resolve, reject) => {
        let result = [];
        let chunk;
        r_stream
            .on('readable', () => __awaiter(this, void 0, void 0, function* () {
            while ((chunk = yield r_stream.read()) != null) {
                result.push(chunk.toString());
            }
        }))
            .on('end', () => {
            resolve(result);
        })
            .on('error', () => {
            reject();
        });
    });
}
exports.streamToArray = streamToArray;
