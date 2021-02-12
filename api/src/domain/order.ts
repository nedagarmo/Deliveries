import storage from './storage';
import order from './../entities/order';

export default class OrderDomain {
    list = (): Array<order> => {
        const store = new storage();
        return store.getOrders();
    };

    get = (id: number): order | null => {
        const store = new storage();
        const orders = store.getOrders();
        const finded = orders.filter((element, index, array) => element.id == id);
        return finded != null && finded.length > 0 ? finded[0] : null;
    };
}
