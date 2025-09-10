import { IEvents } from "./base/events";
import { View } from "./base/View";

export interface IModal {
    content: HTMLElement;
}

export class ModalView extends View<IModal> {
    protected _content: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._content = container.querySelector('.modal__content') as HTMLElement;
        this.closeButton = container.querySelector('.modal__close') as HTMLButtonElement;

        this.closeButton.addEventListener('click', this.close);
        this.container.addEventListener('click', this.close);
        this._content.addEventListener('click', (e) => e.stopPropagation());
    }

    set content(data: HTMLElement) {
        this._content.replaceChildren(data);
    }

    open = () => {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close = () => {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }
}