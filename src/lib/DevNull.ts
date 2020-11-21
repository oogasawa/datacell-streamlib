
import { Writable } from "stream";

export class DevNull extends Writable {
    constructor(options?) {
        super({ ...options, objectMode: true });
    }

    _write(chunk, encoding, done) {
        done();
    }

}
