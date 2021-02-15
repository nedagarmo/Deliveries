import product from './product';
import storage from './../domain/storage';

export default class OrderModel {
    id: number;
    sellerStore: string;
    externalOrderNumber: string;
    buyerFullName: string;
    buyerPhoneNumber: string;
    buyerEmail: string;

    shippingMethod: number;
    shippingMethodName!: string;
    shippingAddress: string;
    shippingCity: string;
    shippingRegion: string;
    shippingCountry: string;
    productList: Array<product>;

    packPromiseMin!: Date;
    packPromiseMax!: Date;
    shipPromiseMin!: Date;
    shipPromiseMax!: Date;
    deliveryPromiseMin!: Date;
    deliveryPromiseMax!: Date;
    readyPickupPromiseMin!: Date;
    readyPickupPromiseMax!: Date;
    creationDate: Date;

    constructor(data: any) {
        this.id = this.generateIdentifier();
        this.sellerStore = data.sellerStore;
        this.externalOrderNumber = data.externalOrderNumber;
        this.buyerFullName = data.buyerFullName;
        this.buyerPhoneNumber = data.buyerPhoneNumber;
        this.buyerEmail = data.buyerEmail;

        this.shippingMethod = data.shippingMethod;
        this.shippingMethodName = '';

        this.shippingAddress = data.shippingAddress;
        this.shippingCity = data.shippingCity;
        this.shippingRegion = data.shippingRegion;
        this.shippingCountry = data.shippingCountry;
        this.productList = Array();

        data.productList.forEach((element: product) => {
            this.productList.push(element);
        });

        this.packPromiseMin = null as any;
        this.packPromiseMax = null as any;
        this.shipPromiseMin = null as any;
        this.shipPromiseMax = null as any;
        this.deliveryPromiseMin = null as any;
        this.deliveryPromiseMax = null as any;
        this.readyPickupPromiseMin = null as any;
        this.readyPickupPromiseMax = null as any;

        this.creationDate = new Date();
    }

    private generateIdentifier = (): number => {
        const store = new storage();
        const orders = store.getOrders();
        return orders.length + 1;
    };

    save = (): boolean => {
        const store = new storage();
        const orders = store.getOrders();
        orders.push(this);
        store.commit(orders);
        return true;
    };
}
