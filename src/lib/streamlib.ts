
export { Map } from "./Map";
export { Filter } from "./Filter";
export { Reduce } from "./Reduce";
export { Split } from "./Split";
export { Unique } from "./Unique";
export { Sort } from "./Sort";


import { Readable } from "stream";



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








