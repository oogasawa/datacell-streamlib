
import { Transform } from "stream";

export class Reduce extends Transform {

    result: any;

    initFunc: () => any;

    // Reduce function : (chunk, result) => result
    func: (arg0: any, arg1: any) => any;

    // tail: string;

    constructor(initFunc: () => any, func: (arg0: any, arg1: any) => any, options?: any) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.initFunc = initFunc;
        this.func = func;
        this.result = null;
    }

    _transform(chunk: string | Buffer | object, encoding: string, callback: Function) {

        if (this.result === null) {
            this.result = this.initFunc();
        }

        this.result = this.func(chunk, this.result);
        callback();
    }

    _flush(callback: Function) {
        this.push(this.result);
        callback();
    }

}

