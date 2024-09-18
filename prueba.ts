class Heap<T> {
    private data: T[];
    private compare: (a: T, b: T) => boolean;

    constructor(compare: (a: T, b: T) => boolean) {
        this.data = [];
        this.compare = compare;
    }

    insert(value: T) {
        this.data.push(value);
        this.bubbleUp();
    }

    extract(): T | undefined {
        if (this.data.length === 0) return undefined;
        const root = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            this.bubbleDown();
        }
        return root;
    }