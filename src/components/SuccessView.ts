import { TPrice } from "../types";
import { IEvents } from "./base/events";
import { View } from "./base/View";

interface ISuccess {
    total: TPrice;
}

export class SuccessView extends View<ISuccess> {
    protected _total: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._total = container.querySelector('.order-success__description');
        this.closeButton = container.querySelector('.order-success__close');

        this.closeButton.addEventListener('click', () => {
            events.emit('success:close');
        })
    }

    set total(value: TPrice) {
        this._total.textContent = `Списано ${value} синапсов`;
    }
}