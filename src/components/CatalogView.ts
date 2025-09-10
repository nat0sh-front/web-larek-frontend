import { View } from "./base/View";

interface ICatalog {
    catalog: HTMLElement[];
}

export class CatalogView extends View<ICatalog> {
    protected _catalog: HTMLElement;

    constructor(protected container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}