
import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";


import * as chai from 'chai';
const expect = chai.expect;

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';


function sleep(msec: number) {
    return new Promise(resolve => {
        setTimeout(resolve, msec);
    });
}


function random_sleep(range_from: number, range_to: number) {
    const r = Math.floor((Math.random() * range_to) + range_from);
    return sleep(r * 1000);
}


describe('#streamToArray', () => {

    context('Stream of simple elements', function() {

        it('should converts "number array stream" into a string array.', async function() {
            const num_array = [1, 2, 3];
            const r_stream: Readable = Readable.from(num_array);
            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            for (let i = 0; i < num_array.length; i++) {
                expect(num_array[i].toString()).equals(result[i]);
            }
        });


        it('should converted "character array stream" into a string array.', async function() {
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

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            for (let i = 0; i < data_array.length; i++) {
                expect(data_array[i]).equals(result[i]);
            }

        });


    });


    context('Stream of promises', function() {
        this.timeout(10000);

        it('should converts "number array stream" into a string array.', async function() {
            const num_array = [1, 2, 3, 4, 5, 6, 7, 8];
            const r_stream: Readable
                = Readable.from(num_array)
                    .pipe(streamlib.getAsyncMap(1, async (elem) => {
                        await random_sleep(0.1, 1);
                        return elem;
                    }));


            const result: string[] = await streamlib.streamToArray(r_stream);

            logger.level = "debug";
            for (let i = 0; i < num_array.length; i++) {
                logger.debug(result[i]);
            }

            for (let i = 0; i < num_array.length; i++) {
                expect(num_array[i].toString()).equals(result[i]);
            }
            logger.level = "error";
        });



    });


});


