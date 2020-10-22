
import { Transform } from "stream";

export class AsyncReduce extends Transform {

    result: any;

    initFunc: () => any;

    // Reduce function : (chunk, result) => result
    func: (arg0: any, arg1: any) => any;

    // tail: string;

    constructor(initFunc: () => any, func: (arg0: any, arg1: any) => any, options?) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.initFunc = initFunc;
        this.func = func;
        this.result = null;
    }

    async _transform(chunk: string | Buffer, encoding: string, callback: Function) {

        if (this.result === null) {
            this.result = await this.initFunc();
        }

        this.result = await this.func(chunk, this.result);
        callback();
    }

    async _flush(callback: Function) {
        this.push(await this.result);
        callback();
    }

}

