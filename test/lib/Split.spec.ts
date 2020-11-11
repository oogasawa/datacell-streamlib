
import { Readable } from "stream";
import * as streamlib from "../../src/lib/streamlib";


import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'debug';





describe('Split', () => {
    describe("Lines of strings", () => {
        it('should be converted into an object mode stream.', async () => {
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
                .pipe(new streamlib.Split());

            const result: string[] = await streamlib.streamToArray(r_stream);
            logger.debug(result);

            for (let i = 0; i < data_array.length; i++) {
                expect(data_array[i]).toEqual(result[i]);
            }

        });
    });
});
