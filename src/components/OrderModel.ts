import { IOrderForm, IOrderModel, TContactForm, TDeliveryForm } from "../types";
import { IEvents } from "./base/events";

export class OrderModel implements IOrderModel {
    protected _orderForm: IOrderForm;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.setNullValue();
    }

    set orderForm(data: Partial<IOrderForm>) {
        this._orderForm = {...this._orderForm, ...data};
        this.events.emit('form:updated')
    }

    get orderForm() {
        return this._orderForm;
    }

    setNullValue() {
        this._orderForm = {
            email: '',
            phone: '',
            address: '',
            payment: null
        };
    }

    reset(): void {
        this.setNullValue();
        this.events.emit('form:cleared');
    }

    validateStep(form: TDeliveryForm | TContactForm): string | null {
        if ('email' in form && !form.email) {
            return 'Необходимо указать email';
        }
        if ('phone' in form && !form.phone) {
            return 'Необходимо указать номер телефона';
        }
        if ('payment' in form && form.payment === null) {
            return 'Необходимо указать способ оплаты';
        }
        if ('address' in form && !form.address) {
            return 'Необходимо указать адрес';
        }
        return null;
    }
}