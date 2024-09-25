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

    private bubbleUp() {
        let index = this.data.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.data[index], this.data[parentIndex])) {
                [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private bubbleDown() {
        let index = 0;
        const length = this.data.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let swap = index;

            if (left < length && this.compare(this.data[left], this.data[swap])) {
                swap = left;
            }
            if (right < length && this.compare(this.data[right], this.data[swap])) {
                swap = right;
            }
            if (swap === index) break;

            [this.data[index], this.data[swap]] = [this.data[swap], this.data[index]];
            index = swap;
        }
    }

    peek(): T | undefined {
        return this.data[0];
    }

    size(): number {
        return this.data.length;
    }
}

enum OrderType {
    Buy = "Buy",
    Sell = "Sell"
}