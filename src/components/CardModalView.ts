import { TItemModal, TPrice } from "../types";
import { IEvents } from "./base/events";
import { CardView } from "./common/CardView";

export class CardModalView extends CardView<TItemModal> {
    protected _description: HTMLParagraphElement;
    protected actionButton: HTMLButtonElement;
    protected inBasket: boolean;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._description = this.container.querySelector('.card__text');
        this.actionButton = this.container.querySelector('.card__button');

        this.actionButton.addEventListener('click', () => {
            if (this.inBasket) {
                this.events.emit('basket:item-removed', { card: this });
            } else {
                this.events.emit('basket:item-added', { card: this });
            }
        });
    }

    set description(text: string) {
        this._description.textContent = text;
    }

    set price(price: TPrice) {
    super.price = price;
    if (price === null) {
        this.actionButton.disabled = true;
        this.actionButton.textContent = 'Недоступно';
    } else {
        this.actionButton.disabled = false;
    }
}

    setButtonState(inBasket: boolean) {
        this.inBasket = inBasket;
        this.actionButton.textContent = inBasket ? 'Убрать из корзины' : 'В корзину';
    }
}
