

import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";


import * as chai from 'chai';
const expect = chai.expect;

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';



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
