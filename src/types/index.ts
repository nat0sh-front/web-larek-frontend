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

export function mapItem(raw: any): IItem {
    const allowedCategories: TCategory[] = [
        'софт-скил',
        'другое',
        'дополнительное',
        'кнопка',
        'хард-скил'
    ];

    return {
        id: raw.id,
        description: raw.description,
        image: raw.image,
        title: raw.title,
        category: allowedCategories.includes(raw.category)
            ? raw.category
            : 'другое', 
        price: typeof raw.price === 'number' ? raw.price : null,
    };
}

export interface IOrderForm {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export type TOrder = IOrderForm & Pick<IBasketModel, 'items' | 'total'>;

export type TItemMain = Pick<IItem, 'title' | 'category' | 'image' | 'price'>;

export type TItemModal = Pick<IItem, 'title' | 'category' | 'description' | 'image' | 'price'>;

export type TItemBasket = Pick<IItem, 'id'  | 'title' | 'price'> & { index: number };


export interface ICatalogModel {
    items: IItem[];
    getItem(id: string): IItem | null;
}

export interface IBasketModel {
    items: string[];
    total: TPrice;
    addItem(id: string): void;
    removeItem(id: string): void;
    inBasket(id: string): boolean;
    calculateTotal(items: IItem[]): void;
    getCount(): number;
    clear(): void;
}

export interface IOrderModel {
    orderForm: IOrderForm;
    clear(): void;
    validateDelivery(): string | null;
    validateContacts(): string | null;
}