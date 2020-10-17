
import { Readable } from "stream";

function streamToArray(r_stream: Readable): Promise<string[]> {

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


async function main(): Promise<void> {

    const a = [1, 2, 3, 4, 5];
    let r_stream = Readable.from(a);

    const array = await streamToArray(r_stream);
    console.log(array);
}

main()
