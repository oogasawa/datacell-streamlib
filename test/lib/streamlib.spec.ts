import lineByLine from "n-readlines";
import { Readable, Transform } from "stream";
import * as streamlib from "../../src/lib/streamlib";
import * as collections from "datacell-collections";


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

function read_data(fname: string): string[] {

    const result: string[] = [];

    const liner = new lineByLine(fname);
    let line: false | Buffer;
    while (line = liner.next()) {
        if (line.toString().length === 0) {
            continue;
        }
        result.push(line.toString());
    }

    return result;
}



describe('#streamToArray', () => {

    describe('Stream of simple elements', function() {

        it('should converts "number array stream" into a string array.', async function() {
            const num_array = [1, 2, 3];
            const r_stream: Readable = Readable.from(num_array);
            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            for (let i = 0; i < num_array.length; i++) {
                expect(num_array[i].toString()).toEqual(result[i]);
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
                expect(data_array[i]).toEqual(result[i]);
            }

        });


    });


    describe('Stream of many elements (exceeding highWaterMark).', () => {

        test('should converts "number array stream" into a string array.', async () => {

            // Reads data from a file into an object array.
            let data: string[] = read_data("test/data.txt");

            let charCount = 0;
            const r_stream: Readable
                = Readable.from(data)
                    .pipe(new Transform({
                        readableObjectMode: true,
                        writableObjectMode: true,
                        highWaterMark: 4, // set small highwatermark
                        transform(chunk, encode, done) {
                            charCount += chunk.toString().length;
                            this.push(chunk);
                            done();
                        }
                    }));
            const result: string[] = await streamlib.streamToArray(r_stream);
            expect(charCount > 5000).toBeTruthy();
            expect(result.length).toEqual(198);

        });


    });


    describe('Stream of promises', function() {

        it('should converts "number array stream" into a string array.', async function() {
            const num_array = [1, 2, 3, 4, 5, 6, 7, 8];
            const r_stream: Readable
                = Readable.from(num_array)
                    .pipe(streamlib.getAsyncMap(5, async (elem) => {
                        await random_sleep(0.01, 0.2);
                        return elem;
                    }));


            const result: string[] = await streamlib.streamToArray(r_stream);

            logger.level = "debug";
            for (let i = 0; i < num_array.length; i++) {
                logger.debug(result[i]);
            }

            for (let i = 0; i < num_array.length; i++) {
                expect(num_array[i].toString()).toEqual(result[i]);
            }
            logger.level = "error";
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
                expect(data_array[i]).toEqual(result[i]);
            }

        });


    });


});


