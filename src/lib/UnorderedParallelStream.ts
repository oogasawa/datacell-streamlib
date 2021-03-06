import { Transform } from 'stream'


// Node.js Design Patterns - Third Edition
// by Luciano Mammino; Mario Casciaro Published by Packt Publishing, 2020 

export class UnorderedParallelStream extends Transform {

    userTransform: Function;
    running: number;
    concurrency: number;

    continueCb: Function;
    terminateCb: Function;

    constructor(concurrency: number, userTransform: Function, opts: object) {
        super({ objectMode: true, ...opts })
        this.concurrency = concurrency;
        this.userTransform = userTransform;
        this.running = 0;
        this.continueCb = null;
        this.terminateCb = null;
    }

    _transform(chunk: string | Buffer, enc: string, done: Function) {
        this.running++;
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this)
        )
        if (this.running < this.concurrency) {
            done();
        }
        else {
            this.continueCb = done;
        }
        done()
    }

    _flush(done: Function) {
        if (this.running > 0) {
            this.terminateCb = done;
        } else {
            done()
        }
    }

    _onComplete(err: Function) {
        this.running--;
        if (err) {
            return this.emit('error', err);
        }
        const tmpCb = this.continueCb;
        this.continueCb = null;
        tmpCb && tmpCb();
        if (this.running === 0) {
            this.terminateCb && this.terminateCb()
        }
    }
}
