import { IApi, IItem, IItemsResponse, IOrder} from "../types";

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

    setOrder(data: IOrder): Promise<IOrder> {
        return this._baseApi.post<IOrder>(`/order`, data, 'POST').then((res: IOrder) => res);
    }
}