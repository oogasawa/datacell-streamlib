
import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";


import * as chai from 'chai';
const expect = chai.expect;

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';



describe('streamToArray', () => {

    context("Number array stream (object mode)", () => {
        it('should be converted into a string array.', async () => {
            const num_array = [1, 2, 3];
            const r_stream: Readable = Readable.from(num_array);
            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            for (let i = 0; i < num_array.length; i++) {
                expect(num_array[i].toString()).equals(result[i]);
            }
        });

    });


    context("String array stream (object mode)", () => {
        it('should be converted into a string array.', async () => {
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
});






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



describe('Reduce', () => {

    context("Object mode number stream", () => {
        it('should be reduced into a sum of the numbers .', async () => {
            const num_array = [1, 2, 3, 4, 5];
            const r_stream: Readable
                = Readable.from(num_array)
                    .pipe(new streamlib.Reduce(
                        () => { return 0; },
                        (num, result) => { return result + num; }
                    ))

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            expect(result[0]).equals('15');

        });

    });
});
