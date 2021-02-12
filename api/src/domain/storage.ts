import order from './../entities/order';

export default class Storage {
    static orders: Array<order>;

    getOrders() {
        return Storage.orders;
    }

    commit(orders: Array<order>) {
        Storage.orders = orders;
    }
}
