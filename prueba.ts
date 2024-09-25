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

class Order {
    constructor(
        public id: number,
        public company: string,
        public quantity: number,
        public price: number,
        public type: OrderType,
        public timestamp: Date = new Date()
    ) {}
}

class StockMarketSimulator {
    private buyOrders: Heap<Order>;
    private sellOrders: Heap<Order>;
    private orderIdCounter: number;
    private transactionHistory: Array<{ company: string, quantity: number, price: number, buyer: Order, seller: Order }>;

    constructor() {
        this.buyOrders = new Heap<Order>((a, b) => a.price > b.price); // Max-heap para órdenes de compra
        this.sellOrders = new Heap<Order>((a, b) => a.price < b.price); // Min-heap para órdenes de venta
        this.orderIdCounter = 1;
        this.transactionHistory = [];
    }

    placeBuyOrder(company: string, quantity: number, price: number) {
        const order = new Order(this.orderIdCounter++, company, quantity, price, OrderType.Buy);
        this.buyOrders.insert(order);
        this.matchOrders();
    }

    placeSellOrder(company: string, quantity: number, price: number) {
        const order = new Order(this.orderIdCounter++, company, quantity, price, OrderType.Sell);
        this.sellOrders.insert(order);
        this.matchOrders();
    }