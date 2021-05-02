
import { Transform } from "stream";

export class Split extends Transform {

    re: RegExp;

    tail: string;

    constructor(re: RegExp = /\n/, options?: any) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.re = re;
        this.tail = '';
    }

    _transform(chunk: string | Buffer | object, encoding: string, callback: Function) {
        const chunkStr: string = (this.tail + chunk);
        const matchedPos = chunkStr.search(this.re);
        if (matchedPos >= 0) {
            const pieces: string[] = chunkStr.split(this.re);
            for (let i = 0; i < pieces.length - 1; i++) {
                this.push(pieces[i]);
            }
            this.tail = pieces[pieces.length - 1];
        }
        else {
            this.tail = chunkStr;
        }
        callback();
    }

    _flush(callback: Function) {
        this.push(this.tail);
        callback();
    }

}
