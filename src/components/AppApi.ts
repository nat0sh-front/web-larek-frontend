import { IApi, IItem, IOrder, IOrderForm } from "../types";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getItems(): Promise<IItem[]> {
        return this._baseApi.get<IItem[]>(`/product`).then((items: IItem[]) => items);
    }

    getItem(id: string): Promise<IItem> {
        return this._baseApi.get<IItem>(`/product/${id}`).then((item: IItem) => item);
    }

    setOrder(data: IOrder): Promise<IOrder> {
        return this._baseApi.post<IOrder>(`/order`, data, 'POST').then((res: IOrder) => res);
    }
}