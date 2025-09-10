import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/BasketModel';
import { CardCatalogView } from './components/CardCatalogView';
import { CardModalView } from './components/CardModalView';
import { CatalogModel } from './components/CatalogModel';
import { CatalogView } from './components/CatalogView';
import { OrderModel } from './components/OrderModel';
import { PageView } from './components/PageView';
import { ModalView } from './components/ModalView';
import './scss/styles.scss';
import { IItem, mapItem, TCategory, TPayment } from './types';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();
const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const orderFormModel = new OrderModel(events);

events.onAll((event) => {
    console.log(event.eventName, event.data);
})

api
	.getItems()
	.then((res) => {
        catalogModel.items = res.items;
        events.emit('initialData:loaded');
	})
	.catch((err) => {
		console.error(err);
	});

// api.getItem('90973ae5-285c-4b6f-a6d0-65d1d760b102')
//     .then((item) => {
//         basket.addItem(item.id);
//     })
//     .catch((err) => {
//         console.error(err);
//     })

// api.setOrder(testOrder)
//     .then((orderData) => {
//         console.log(orderData);
//     })

const pageElement: HTMLElement = document.querySelector('.page');
const gallery: HTMLElement = document.querySelector('.gallery');
const modalElement: HTMLElement = document.querySelector('.modal');

const page = new PageView(pageElement, events);
const catalog = new CatalogView(gallery);
const modal = new ModalView(modalElement, events);

const cardCatalogTemplate: HTMLTemplateElement =
	document.querySelector('#card-catalog');
const cardModalTemplate: HTMLTemplateElement =
	document.querySelector('#card-preview');

events.on('initialData:loaded', () => {
        const cardsArray = catalogModel.items.map((item) => {
        const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), events);
        return card.render(mapItem(item));
    });

    catalog.render({ catalog: cardsArray });
})

events.on('card:select', (data: { card: IItem }) => {
	const { card } = data;
	const item = catalogModel.getItem(card.id);
    const cardModal = new CardModalView(cloneTemplate(cardModalTemplate), events);
	const modalContent = cardModal.render(item);
    modal.render({content: modalContent});
    modal.open();
});
