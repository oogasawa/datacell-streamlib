
import { Readable, Transform } from "stream";

export class Map extends Transform {

    func: (arg0: any) => any;

    // tail: string;

    constructor(func: (arg0: any) => any, options?: any) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.func = func;
    }

    _transform(chunk: string | Buffer | object, encoding: string, callback: Function) {
        this.push(this.func(chunk));
        callback();
    }

    _flush(callback: Function) {
        this.push(null);
        callback();
    }

}
