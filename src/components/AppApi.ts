import { IItem, TOrder } from "../types";
import { ApiPostMethods } from "./base/api";

interface IItemsResponse {
  total: number;
  items: IItem[];
}

interface IOrderResponse {
    items: string[];
    total: number;
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getItems(): Promise<IItemsResponse> {
        return this._baseApi.get<IItemsResponse>(`/product`);
    }

    getItem(id: string): Promise<IItem> {
        return this._baseApi.get<IItem>(`/product/${id}`).then((item: IItem) => item);
    }

    setOrder(data: TOrder): Promise<IOrderResponse> {
        return this._baseApi.post<TOrder>(`/order`, data, 'POST').then((res: IOrderResponse) => res);
    }
}