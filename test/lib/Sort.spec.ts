

import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';



describe('Sort', () => {

    describe("Object mode number stream", () => {
        it('should be sorted in ascendent order.', async () => {
            const num_array = [4, 5, 1, 2, 3, 4, 5];
            const r_stream: Readable
                = Readable.from(num_array)
                    .pipe(new streamlib.Sort());

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            const ans_array = [1, 2, 3, 4, 4, 5, 5];
            for (let i = 0; i < ans_array.length; i++) {
                expect(result[i]).toEqual(ans_array[i].toString());
            }
        }
        )
    });


    describe("Object mode string stream", () => {
        it('should be sorted in ascendent order.', async () => {

            const data_array = [
                "after",
                "affect",
                "afraid",
                "again",
                "advise",
                "advertisement",
                "against"];

            const r_stream: Readable
                = Readable.from(data_array)
                    .pipe(new streamlib.Sort());

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            const ans_array = [
                "advertisement",
                "advise",
                "affect",
                "afraid",
                "after",
                "again",
                "against"];


            for (let i = 0; i < ans_array.length; i++) {
                expect(result[i]).toEqual(ans_array[i].toString());
            }
        }
        )
    });


});
