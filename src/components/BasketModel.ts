import { IBasketModel, TPrice } from "../types";
import { IEvents } from "./base/events";

export class BasketModel implements IBasketModel {
    protected _items: Set<string> = new Set();
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(itemIds: Set<string>) {
        this._items = itemIds;
        this.events.emit('basket:changed');
    }

    get items() {
        return this._items;
    }

    addItem(id: string): void {
        this._items.add(id);
        this.events.emit('basket:changed');
    }

    removeItem(id: string): void {
        this._items.delete(id);
        this.events.emit('basket:changed');
    }

    calculateTotal(): TPrice {
        return 0;
    }

    getCount(): number {
        return this._items.size;
    }

    clear(): void {
        this._items.clear();
        this.events.emit('basket:cleared');
    }
}