
import { Transform } from "stream";

export class Unique extends Transform {

    dataSet: Set<string>;

    // Reduce function : (chunk, result) => result
    func: (arg0: any, arg1: any) => any;

    // tail: string;

    constructor(options?: object) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.dataSet = new Set<string>();
    }

    _transform(chunk: string | Buffer, encoding: string, callback: Function) {

        this.dataSet.add(chunk.toString());
        callback();
    }

    _flush(callback: Function) {
        this.dataSet.forEach((elem) => {
            this.push(elem);
        });
        callback();
    }

}

