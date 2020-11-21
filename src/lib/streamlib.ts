
export { Map } from "./Map";
export { Filter } from "./Filter";
export { Reduce } from "./Reduce";
export { Split } from "./Split";
export { Unique } from "./Unique";
export { Sort } from "./Sort";
export { DevNull } from "./DevNull";

import parallelTransform from "parallel-transform";
import { Readable, Transform } from "stream";
import { DevNull } from "./DevNull";



export function getAsyncFilter(
    concurrency: number,
    func: (arg: Buffer) => Promise<boolean>,
    options = {}): Transform {

    return parallelTransform(
        concurrency,
        options,
        async function(chunk, done) {
            if (!chunk) { // null or undefined
                return done();
            }
            if (await func(chunk)) {
                this.push(chunk);
            }
            done();
        });
}



export function getAsyncMap(
    concurrency: number,
    func: (arg: Buffer) => Promise<Buffer>,
    options = {}): Transform {

    return parallelTransform(
        concurrency,
        options,
        async function(chunk, done) {
            if (!chunk) {
                return done();
            }
            this.push(await func(chunk));
            done();
        });
}





/** Converts a Readable stream into a string array.
 * 
 * @param r_stream A Readable stream.
 * @return A Promise of a string array.
 */
export function streamToArray(r_stream: Readable): Promise<string[]> {

    return new Promise(
        (resolve, reject) => {

            let result: string[] = [];
            let chunk: Buffer;

            r_stream
                .on('readable', async () => {
                    while ((chunk = await r_stream.read()) != null) {
                        result.push(chunk.toString())
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


