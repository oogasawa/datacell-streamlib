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
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
function streamToArray(r_stream) {
    return new Promise((resolve, reject) => {
        let result = [];
        let chunk;
        r_stream
            .on('readable', () => {
            while ((chunk = r_stream.read()) != null) {
                result.push(chunk.toString());
            }
        })
            .on('end', () => {
            resolve(result);
        })
            .on('error', () => {
            reject();
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const a = [1, 2, 3, 4, 5];
        let r_stream = stream_1.Readable.from(a);
        const array = yield streamToArray(r_stream);
        console.log(array);
    });
}
main();
