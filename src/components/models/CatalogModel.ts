import { ICatalogModel, IItem } from "../../types";
import { IEvents } from "../base/events";

export class CatalogModel implements ICatalogModel{
    protected _items: IItem[] = [];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getItem(id: string): IItem {
        return this._items.find(item => item.id === id);
    }

    set items(items: IItem[]) {
        this._items = items;
    }

    get items() {
        return this._items;
    }
}