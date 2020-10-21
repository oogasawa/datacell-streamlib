

import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";


import * as chai from 'chai';
const expect = chai.expect;

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';



describe('Map', () => {
    context("Object mode stream", () => {
        it('should be transformed according to a given function.', async () => {
            const data_array = [
                "advertisement",
                "advise",
                "affect",
                "afraid",
                "after",
                "again",
                "against"];
            const data = data_array.join("\n");
            const r_stream: Readable = Readable.from(data)
                .pipe(new streamlib.Split())
                .pipe(new streamlib.Filter((elem: string) => {
                    return elem.length <= 5;
                }))
                .pipe(new streamlib.Map((elem) => {
                    return "@@" + elem;
                }));

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);


            const ans_array = [
                "after",
                "again"
            ];

            for (let i = 0; i < ans_array.length; i++) {
                expect('@@' + ans_array[i]).equals(result[i]);
            }


        });
    });

});
