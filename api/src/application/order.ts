import product from '../entities/product';
import order from './../entities/order';
import melonnService from './../services/melonn';
import logging from './../config/logging';

export default class OrderApplication {
    private NAMESPACE = 'OrderApplication';
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
            const nextBusinessDays = await this.getWorkDays(nowDateTime, 10);

            const orderWeight = o.productList.reduce((acc: number, p: product) => {
                return acc + p.weight;
            }, 0);

            const minWeight = shippingMethod.rules.availability.byWeight.min;
            const maxWeight = shippingMethod.rules.availability.byWeight.max;

            if (minWeight <= orderWeight <= maxWeight) {
                const dayType = shippingMethod.rules.availability.byRequestTime.dayType;
                const fromTimeOfDay = shippingMethod.rules.availability.byRequestTime.fromTimeOfDay;
                const toTimeOfDay = shippingMethod.rules.availability.byRequestTime.toTimeOfDay;

                let workingCase: any = undefined;
                switch (dayType) {
                    case 'ANY':
                        if (this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay))
                            workingCase = this.getCaseThatApplies(shippingMethod.rules.promisesParameters.cases, isTodayABusinessDay, nowDateTime);
                        break;
                    case 'BUSINESS':
                        if (isTodayABusinessDay && this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay))
                            workingCase = this.getCaseThatApplies(shippingMethod.rules.promisesParameters.cases, isTodayABusinessDay, nowDateTime);
                        break;
                    case 'NON-BUSINESS':
                        break;
                    case 'WEEKEND':
                        break;
                    default:
                        break;
                }

                if (workingCase != undefined) {
                    [o.packPromiseMin, o.packPromiseMax] = this.calculatePromise(workingCase.packPromise, nowDateTime, nextBusinessDays);
                    [o.shipPromiseMin, o.shipPromiseMax] = this.calculatePromise(workingCase.shipPromise, nowDateTime, nextBusinessDays);
                    [o.deliveryPromiseMin, o.deliveryPromiseMax] = this.calculatePromise(workingCase.deliveryPromise, nowDateTime, nextBusinessDays);
                    [o.readyPickupPromiseMin, o.readyPickupPromiseMax] = this.calculatePromise(
                        workingCase.readyPickUpPromise,
                        nowDateTime,
                        nextBusinessDays
                    );
                }
            }

            console.log(o);

            return o.save();
        } catch (error) {
            logging.error(this.NAMESPACE, `METHOD: [newOrder]`, error);
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

    getCaseThatApplies = (cases: Array<any>, isTodayABusinessDay: boolean, nowDateTime: Date) => {
        cases
            .sort((a, b) => (a.priority > b.priority ? 1 : -1))
            .forEach((element) => {
                const dayType = element.condition.byRequestTime.dayType;
                const fromTimeOfDay = element.condition.byRequestTime.fromTimeOfDay;
                const toTimeOfDay = element.condition.byRequestTime.toTimeOfDay;

                switch (dayType) {
                    case 'ANY':
                        if (this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay)) return element;
                        break;
                    case 'BUSINESS':
                        if (isTodayABusinessDay && this.isValidTimeOfDay(nowDateTime, fromTimeOfDay, toTimeOfDay)) return element;
                        break;
                    case 'NON-BUSINESS':
                        break;
                    case 'WEEKEND':
                        break;
                    default:
                        break;
                }
            });

        return null;
    };

    calculatePromise = (pack: any, nowDateTime: Date, nextBusinessDays: Array<string>) => {
        const minType = pack.min.type;
        const minDeltaHours = pack.min.DeltaHours;
        const minDeltaBusinessDays = pack.min.minDeltaBusinessDays;
        const minTimeOfDay = pack.min.TimeOfDay;

        const maxType = pack.max.type;
        const maxDeltaHours = pack.max.DeltaHours;
        const maxDeltaBusinessDays = pack.max.minDeltaBusinessDays;
        const maxTimeOfDay = pack.max.TimeOfDay;

        return [
            this.getPromiseDate(minType, nowDateTime, minDeltaHours, nextBusinessDays, minDeltaBusinessDays, minTimeOfDay),
            this.getPromiseDate(maxType, nowDateTime, maxDeltaHours, nextBusinessDays, maxDeltaBusinessDays, maxTimeOfDay)
        ];
    };

    getPromiseDate = (
        type: string,
        nowDateTime: Date,
        deltaHours: number,
        nextBusinessDays: Array<string>,
        deltaBusinessDays: number,
        timeOfDay: number
    ) => {
        let datePack = null as any;

        switch (type) {
            case 'NULL':
                break;
            case 'DELTA-HOURS':
                datePack = nowDateTime.setHours(nowDateTime.getHours() + deltaHours);
                break;
            case 'DELTA-BUSINESSDAYS':
                datePack = new Date(nextBusinessDays[deltaBusinessDays - 1]);
                datePack.setHours(timeOfDay);
                break;
            default:
                break;
        }

        return datePack;
    };
}
