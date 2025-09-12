import { IBasketModel, IItem, TPrice } from "../../types";
import { IEvents } from "../base/events";

export class BasketModel implements IBasketModel {
    protected _items: string[] = [];
    protected _total: number = 0;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(itemIds: string[]) {
        this._items = itemIds;
        this.events.emit('basket:changed');
    }

    get items() {
        return this._items;
    }

    set total(value: number) {
        this._total = value;
    }

    get total() {
        return this._total;
    }

    addItem(id: string): void {
        this._items.push(id);
        this.events.emit('basket:changed', { cards: this._items });
    }

    removeItem(id: string): void {
        this._items = this._items.filter((item) => item !== id);
        this.events.emit('basket:changed', { cards: this._items });
    }

    inBasket(id: string): boolean {
        return this._items.includes(id);
    }

    calculateTotal(items: IItem[]) {
        this._total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    getCount(): number {
        return this._items.length;
    }

    clear(): void {
        this._items = [];
    }
}