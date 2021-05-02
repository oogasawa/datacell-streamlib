
import { Writable } from "stream";

export class DevNull extends Writable {
    constructor(options?: any) {
        super({ ...options, objectMode: true });
    }

    _write(chunk: string | Buffer | object, encoding: string, done: Function) {
        done();
    }

}
