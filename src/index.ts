import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/BasketModel';
import { CatalogModel } from './components/CatalogModel';
import { OrderModel } from './components/OrderModel';
import './scss/styles.scss';
import { mapItem, TCategory, TPayment } from './types';
import { API_URL, settings } from './utils/constants';

const events = new EventEmitter();
const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalog = new CatalogModel(events);
const basket = new BasketModel(events);
const orderForm = new OrderModel(events);

const testItem = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
}

const testCards = {
    "total": 10,
    "items": [
        {
            "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
            "description": "Если планируете решать задачи в тренажёре, берите два.",
            "image": "/5_Dots.svg",
            "title": "+1 час в сутках",
            "category": "софт-скил",
            "price": 750
        },
        {
            "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
            "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
            "image": "/Shell.svg",
            "title": "HEX-леденец",
            "category": "другое",
            "price": 1450
        },
        {
            "id": "b06cde61-912f-4663-9751-09956c0eed67",
            "description": "Будет стоять над душой и не давать прокрастинировать.",
            "image": "/Asterisk_2.svg",
            "title": "Мамка-таймер",
            "category": "софт-скил",
            "price": null
        },
        {
            "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
            "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
            "image": "/Soft_Flower.svg",
            "title": "Фреймворк куки судьбы",
            "category": "дополнительное",
            "price": 2500
        },
        {
            "id": "1c521d84-c48d-48fa-8cfb-9d911fa515fd",
            "description": "Если орёт кот, нажмите кнопку.",
            "image": "/mute-cat.svg",
            "title": "Кнопка «Замьютить кота»",
            "category": "кнопка",
            "price": 2000
        },
        {
            "id": "f3867296-45c7-4603-bd34-29cea3a061d5",
            "description": "Чтобы научиться правильно называть модификаторы, без этого не обойтись.",
            "image": "Pill.svg",
            "title": "БЭМ-пилюлька",
            "category": "другое",
            "price": 1500
        },
        {
            "id": "54df7dcb-1213-4b3c-ab61-92ed5f845535",
            "description": "Измените локацию для поиска работы.",
            "image": "/Polygon.svg",
            "title": "Портативный телепорт",
            "category": "другое",
            "price": 100000
        },
        {
            "id": "6a834fb8-350a-440c-ab55-d0e9b959b6e3",
            "description": "Даст время для изучения React, ООП и бэкенда",
            "image": "/Butterfly.svg",
            "title": "Микровселенная в кармане",
            "category": "другое",
            "price": 750
        },
        {
            "id": "48e86fc0-ca99-4e13-b164-b98d65928b53",
            "description": "Очень полезный навык для фронтендера. Без шуток.",
            "image": "Leaf.svg",
            "title": "UI/UX-карандаш",
            "category": "хард-скил",
            "price": 10000
        },
        {
            "id": "90973ae5-285c-4b6f-a6d0-65d1d760b102",
            "description": "Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.",
            "image": "/Mithosis.svg",
            "title": "Бэкенд-антистресс",
            "category": "другое",
            "price": 1000
        }
    ]
}

const testOrder = {
    "payment": "online" as TPayment,
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
}

api.getItems()
    .then((cards) => {
        catalog.items = cards;
    })
    .catch((err) => {
        console.error(err);
    });

api.getItem('90973ae5-285c-4b6f-a6d0-65d1d760b102')
    .then((item) => {
        basket.addItem(item.id);
    })
    .catch((err) => {
        console.error(err);
    })

api.setOrder(testOrder)
    .then((orderData) => {
        console.log(orderData);
    })

// catalog.items = testCards.items.map((item) => mapItem(item));
// console.log(catalog.items);
// catalog.preview = '90973ae5-285c-4b6f-a6d0-65d1d760b102';
// console.log(catalog.preview);
// catalog.clearPreview();
// console.log(catalog.preview);

// const item = catalog.getItem('854cef69-976d-4c2a-a18c-2aa45046c390');
// console.log(item);

// basket.addItem(testItem.id);
// console.log(basket.items);

// basket.removeItem(testItem.id);
// console.log(basket.items);

// basket.addItem(testItem.id);
// console.log(basket.items);

// console.log(basket.getCount());

// basket.clear();
// console.log(basket.getCount());

// orderForm.orderForm = {payment: 'Онлайн', address: 'Test'};
// console.log(orderForm.validateStep({payment: 'Онлайн', address: 'Test'}));


