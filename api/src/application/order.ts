import order from './../entities/order';

export default class OrderApplication {
    newOrder = (payload: any) => {
        const o: order = new order(payload);

        return true;
    };
}
