import { IItem, TCategory, TPrice } from "../types";
import { CDN_URL } from "../utils/constants";
import { IEvents } from "./base/events";
import { View } from "./base/View";

const categoryMap: Record<TCategory | 'другое', string> = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export class CardView<T> extends View<T> {
    protected events: IEvents;
    protected _id: string;
    protected _category: HTMLSpanElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _price: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._category = this.container.querySelector('.card__category');
        this._title = this.container.querySelector('.card__title');
        this._image = this.container.querySelector('.card__image');
        this._price = this.container.querySelector('.card__price');
    }

    set id(id: string) {
        this._id = id;
    }

    set category(category: TCategory) {
        const key = category in categoryMap ? category : 'другое';

        this._category.textContent = String(category);

        for (const mapKey in categoryMap) {
            this._category.classList.toggle(
                categoryMap[mapKey as keyof typeof categoryMap],
                mapKey === key
            );
        }
    }

    set title(title: string) {
        this._title.textContent = title;
    }

    set image(image: string) {
        this._image.src = `${CDN_URL}${image}`;
        this._image.alt = this._title.textContent || 'Изображение товара';
    }

    set price(price: TPrice) {
        if (price === null || price === undefined) {
            this._price.textContent = 'Бесценно';
            this._price.classList.add('card__price_free');
        } else {
            this._price.textContent = `${price} синапсов`;
            this._price.classList.remove('card__price_free');
        }
    }

    get id() {
        return this._id;
    }
}
