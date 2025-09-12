import { TItemBasket } from "../types";
import { IEvents } from "./base/events";
import { CardView } from "./common/CardView";

export class CardBasketView extends CardView<TItemBasket> {
    protected _index: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container:HTMLElement, events: IEvents) {
        super(container, events);

        this._index = this.container.querySelector('.basket__item-index');
        this.deleteButton = this.container.querySelector('.basket__item-delete');

        this.deleteButton.addEventListener('click', () => {
            this.events.emit('basket:item-removed', { card: this });
        });
    }

    set index(i: number) {
        this._index.textContent = String(i);
    }
}