import { createElement } from "../utils/utils";
import { View } from "./base/View";
import { IEvents } from "./base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export class BasketView extends View<IBasketView> {
    protected list: HTMLElement;
    protected _total: HTMLElement;
    protected button: HTMLButtonElement;
    protected events: IEvents

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.list = this.container.querySelector('.basket__list');
        this._total = this.container.querySelector('.basket__price');
        this.button = this.container.querySelector('.basket__button');

        if (this.button) {
            this.button.addEventListener('click', () => {
                events.emit('delivery:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this.list.replaceChildren(...items);
        } else {
            const emptyBasket = createElement('p');
            emptyBasket.textContent = 'Корзина пуста';
            this.list.replaceChildren(emptyBasket);
        }
    }

    set total(total: number) {
        this._total.textContent = `${total} синапсов`
    }

    setButtonState(items: string[]) {
        if (items.length) {
            this.button.disabled = false;
        } else {
            this.button.disabled = true;
        }
    }
}