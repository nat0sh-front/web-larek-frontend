import { IEvents } from "./base/events";
import { View } from "./base/View";

interface IPage {
    counter: number;
    locked: boolean;
}

export class PageView extends View<IPage> {
    protected _counter: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._counter = container.querySelector('.header__basket-counter');
        this._wrapper = container.querySelector('.page__wrapper');
        this._basket = container.querySelector('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}