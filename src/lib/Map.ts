
import { Readable, Transform } from "stream";

export class Map extends Transform {

    func: (any) => any;

    // tail: string;

    constructor(func: (any) => any, options?) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.func = func;
    }

    _transform(chunk: string | Buffer, encoding: string, callback: Function) {
        this.push(this.func(chunk));
        callback();
    }

    _flush(callback: Function) {
        this.push(null);
        callback();
    }

}
