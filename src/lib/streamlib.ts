
import { Readable, Transform } from "stream";

import * as log4js from 'log4js';
const logger = log4js.getLogger();
// logger.level = 'warn';



/** Converts a Readable stream into a string array.
 * 
 * @param r_stream A Readable stream.
 * @return A Promise of a string array.
 */
export function streamToArray(r_stream: Readable): Promise<string[]> {

    return new Promise(
        (resolve, reject) => {

            let result: string[] = [];
            let chunk: Buffer;

            r_stream
                .on('readable', () => {
                    while ((chunk = r_stream.read()) != null) {
                        result.push(chunk.toString());
                    }
                })
                .on('end', () => {
                    resolve(result);
                })
                .on('error', () => {
                    reject();
                });
        });
}


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
        logger.debug(chunk);
        this.push(this.func(chunk));
        callback();
    }

    _flush(callback: Function) {
        this.push(null);
        callback();
    }

}


export class Filter extends Transform {

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
        logger.debug(chunk);
        if (this.func(chunk)) {
            this.push(chunk);
        }
        callback();
    }

    _flush(callback: Function) {
        this.push(null);
        callback();
    }

}


export class Reduce extends Transform {

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

    _transform(chunk: string | Buffer, encoding: string, callback: Function) {

        if (this.result === null) {
            this.result = this.initFunc();
        }

        logger.debug(chunk);
        this.result = this.func(chunk, this.result);
        callback();
    }

    _flush(callback: Function) {
        this.push(this.result);
        callback();
    }

}



export class Split extends Transform {

    re: RegExp;

    tail: string;

    constructor(re: RegExp = /\n/, options?) {
        super({
            ...options,
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.re = re;
        this.tail = '';
    }

    _transform(chunk: string | Buffer, encoding: string, callback: Function) {
        logger.debug(chunk);
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

