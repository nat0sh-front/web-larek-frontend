import { TItemModal } from "../types";
import { IEvents } from "./base/events";
import { CardView } from "./CardView";

export class CardModalView extends CardView<TItemModal> {
    protected _description: HTMLParagraphElement;
    protected actionButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._description = this.container.querySelector('.card__text');
        this.actionButton = this.container.querySelector('.card__button');

        this.actionButton.addEventListener('click', () => {
            if (this.actionButton.textContent === 'Купить') {
                this.events.emit('basket:item-added', { card: this });
            }
            if (this.actionButton.textContent === 'Убрать из корзины') {
                this.events.emit('basket:item-removed', { card: this });
            }
        });
    }

    set description(text: string) {
        this._description.textContent = text;
    }

    setButtonState(inBasket: boolean) {
        this.actionButton.textContent = inBasket ? 'Убрать из корзины' : 'Купить';
    }
}
