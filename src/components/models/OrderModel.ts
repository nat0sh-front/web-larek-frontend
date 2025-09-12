import { IOrderForm, IOrderModel } from "../../types";
import { IEvents } from "../base/events";

export class OrderModel implements IOrderModel {
    protected _orderForm: IOrderForm = {
        address: '',
        email: '',
        phone: '',
        payment: null
    };
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set orderForm(data: Partial<IOrderForm>) {
        this._orderForm = { ...this._orderForm, ...data };
    }

    get orderForm(): IOrderForm {
        return this._orderForm;
    }

    clear(): void {
        this._orderForm = {
            address: '',
            email: '',
            phone: '',
            payment: null
        };
    }

    validateDelivery(): string | null {
        if (!this._orderForm.payment) {
            return "Необходимо указать способ оплаты";
        }
        if (!this._orderForm.address.trim()) {
            return "Необходимо указать адрес";
        }
        return null;
    }

    validateContacts(): string | null {
        if (!this._orderForm.email.trim()) {
            return "Необходимо указать email";
        }
        if (!this._orderForm.phone.trim()) {
            return "Необходимо указать номер телефона";
        }
        return null;
    }

}
