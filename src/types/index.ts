export type TCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type TPayment = 'Онлайн' | 'При получении' | null;

export type TPrice = number | null;

export interface IItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: TCategory;
    price: TPrice;
}

export interface IOrderForm {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export type TItemMain = Pick<IItem, 'title' | 'category' | 'image' | 'price'>;

export type TItemModal = Pick<IItem, 'title' | 'category' | 'description' | 'image' | 'price'>;

export type TItemBasket = Pick<IItem, 'id' | 'title' | 'price'>;

export type TDeliveryForm = Pick<IOrderForm, 'payment' | 'address'>;

export type TContactForm = Pick<IOrderForm, 'email' | 'phone'>

export interface ICatalogModel {
    items: IItem[];
    preview: string | null;
    getItem(id: string): IItem | null;
}

export interface IBasketModel {
    items: Set<string>;
    addItem(id: string): void;
    removeItem(id: string): void;
    calculateTotal(): TPrice;
    getCount(): number;
    clear(): void;
}

export interface IOrderModel {
    orderForm: IOrderForm;
    reset(): void;
}