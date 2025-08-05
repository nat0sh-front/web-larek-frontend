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

export interface ICustomer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export type TItemMain = Pick<IItem, 'title' | 'category' | 'image' | 'price'>;

export type TItemModal = Pick<IItem, 'title' | 'category' | 'description' | 'image' | 'price'>;

export type TItemBasket = Pick<IItem, 'id' | 'title' | 'price'>;

export interface ICatalogModel {
    setItems(items: IItem[]): void;
    getItems(): IItem[];
    getItem(id: string): IItem | null;
    setPreview(id: string | null): void;
    getPreview(): string | null;
}

export interface IBasketModel {
    getItems(): Set<string>;
    addItem(id: string): void;
    removeItem(id: string): void;
    calculateTotal(items: IItem[]): TPrice;
    getItemsCount(): number;
    clear(): void;
}

export interface ICustomerModel {
  getCustomer(): ICustomer;
  setCustomer(data: Partial<ICustomer>): void;
  validateStep(fieldsPartial: Partial<ICustomer>): Partial<Record<keyof ICustomer, string | null>>;
  validateAll(): boolean;
}