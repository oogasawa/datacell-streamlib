
import { Transform } from "stream";

export class Sort extends Transform {

    dataSet: string[];

    comparator: (a: string, b: string) => number;

    constructor(options?: object) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.dataSet = [];

        this.comparator = (a: string, b: string): number => {
            if (a > b) { return 1; }
            else if (a === b) { return 0; }
            else { return -1; }
        };

    }

    _transform(chunk: string | Buffer | object, encoding: string, callback: Function) {

        this.dataSet.push(chunk.toString());
        callback();
    }

    _flush(callback: Function) {
        this.dataSet
            .sort(this.comparator)
            .forEach((elem) => {
                this.push(elem);
            });
        callback();
    }

}

