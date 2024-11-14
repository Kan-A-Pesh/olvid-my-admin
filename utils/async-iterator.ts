export default async function toArray<T>(asyncIterator: AsyncIterable<T>) {
    const arr: T[] = [];
    for await (const i of asyncIterator) arr.push(i);
    return arr;
}
