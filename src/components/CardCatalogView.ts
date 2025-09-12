import { TItemMain } from "../types";
import { IEvents } from "./base/events";
import { CardView } from "./common/CardView";

export class CardCatalogView extends CardView<TItemMain> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', { card: this });
        });
    }
}
