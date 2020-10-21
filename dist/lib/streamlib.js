"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToArray = void 0;
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
