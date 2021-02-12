import product from '../entities/product';
import order from './../entities/order';
import melonnService from './../services/melonn';

export default class OrderApplication {
    private offDays: Array<string>;

    constructor() {
        this.offDays = Array();
    }

    newOrder = async (payload: any) => {
        try {
            const service: melonnService = new melonnService();
            const o: order = new order(payload);

            const shippingMethod = await service.getShippingMethod(o.shippingMethod);
            this.offDays = await service.listOffDays();

            const nowDateTime = new Date();

            //offDays.push('2021-02-12');
            const isTodayABusinessDay = this.isBusinessDay(nowDateTime);
            const tenNextBusinessDays = this.getWorkDays(nowDateTime, 10);

            const orderWeight = o.productList.reduce((acc: number, p: product) => {
                return acc + p.weight;
            }, 0);

            const minWeight = shippingMethod.rules.availability.byWeight.min;
            const maxWeight = shippingMethod.rules.availability.byWeight.max;

            if (minWeight <= orderWeight <= maxWeight) {
                const dayType = shippingMethod.rules.availability.byRequestTime.dayType;
                const fromTimeOfDay = shippingMethod.rules.availability.byRequestTime.fromTimeOfDay;
                const toTimeOfDay = shippingMethod.rules.availability.byRequestTime.toTimeOfDay;

                switch (dayType) {
                    case 'ANY':
                        if (this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay)) this.calculatePromises();
                        break;
                    case 'BUSINESS':
                        if (isTodayABusinessDay && this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay)) this.calculatePromises();
                        break;
                    case 'NON-BUSINESS':
                        break;
                    case 'WEEKEND':
                        break;
                    default:
                        break;
                }
            }

            return o.save();
        } catch (error) {
            return false;
        }
    };

    getWorkDays = async (from: Date, to: number) => {
        const workDays: Array<string> = Array();

        do {
            from.setDate(from.getDate() + 1);

            if (this.isBusinessDay(from)) {
                workDays.push(this.dateToStringFormat(from));
            }
        } while (workDays.length < to);
        return workDays;
    };

    isBusinessDay = (aDate: Date) => !this.offDays.some((day: string) => day == this.dateToStringFormat(aDate));

    isValidTimeOfDay = (aDate: Date, from: number, to: number) => from <= aDate.getHours() && aDate.getHours() <= to;

    dateToStringFormat = (aDate: Date) => `${aDate.getFullYear()}-${String(aDate.getMonth() + 1).padStart(2, '0')}-${aDate.getDate()}`;

    // Pending
    calculatePromises = () => true;
}
