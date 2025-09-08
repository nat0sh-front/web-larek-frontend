import { ICatalogModel, IItem } from "../types";
import { IEvents } from "./base/events";

export class CatalogModel implements ICatalogModel{
    protected _items: IItem[] = [];
    protected _preview: string | null = null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getItem(id: string): IItem {
        return this._items.find(item => item.id === id);
    }

    clearPreview() {
        this._preview = null;
        this.events.emit('catalog:clear-preview')
    }

    set items(items: IItem[]) {
        this._items = items;
    }

    get items() {
        return this._items;
    }

    set preview(id: string | null) {
        this._preview = id;
        if(id) {
            this.events.emit('catalog:preview')
        }
    }

    get preview() {
        return this._preview;
    }
}