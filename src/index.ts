import './scss/styles.scss';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/models/BasketModel';
import { CardCatalogView } from './components/CardCatalogView';
import { CardModalView } from './components/CardModalView';
import { CatalogModel } from './components/models/CatalogModel';
import { CatalogView } from './components/CatalogView';
import { OrderModel } from './components/models/OrderModel';
import { PageView } from './components/PageView';
import { ModalView } from './components/common/ModalView';
import { IItem, mapItem, TOrder, TPayment } from './types';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { BasketView } from './components/BasketView';
import { CardBasketView } from './components/CardBasketView';
import { DeliveryFormView } from './components/DeliveryFormView';
import { ContactsFormView } from './components/ContactsFormView';
import { SuccessView } from './components/SuccessView';

const events = new EventEmitter();
const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

api
	.getItems()
	.then((res) => {
		catalogModel.items = res.items;
		events.emit('initialData:loaded');
	})
	.catch((err) => {
		console.error(err);
	});

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
const cardBasketTemplate: HTMLTemplateElement =
	document.querySelector('#card-basket');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const deliveryFormTemplate: HTMLTemplateElement =
	document.querySelector('#delivery');
const contactsFormTemplate: HTMLTemplateElement =
	document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const cardModal = new CardModalView(cloneTemplate(cardModalTemplate), events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);
const deliveryForm = new DeliveryFormView(
	cloneTemplate(deliveryFormTemplate),
	events
);
const contactsForm = new ContactsFormView(
	cloneTemplate(contactsFormTemplate),
	events
);
const success = new SuccessView(cloneTemplate(successTemplate), events);

events.on('initialData:loaded', () => {
	const cardsArray = catalogModel.items.map((item) => {
		const card = new CardCatalogView(
			cloneTemplate(cardCatalogTemplate),
			events
		);
		return card.render(mapItem(item));
	});

	catalog.render({ catalog: cardsArray });
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('card:select', (data: { card: IItem }) => {
	const { card } = data;
	const item = catalogModel.getItem(card.id);
	cardModal.setButtonState(basketModel.inBasket(card.id));
	const modalContent = cardModal.render(item);
	modal.render({ content: modalContent });
	modal.open();
});

events.on('basket:item-added', (data: { card: IItem }) => {
	const { card } = data;
	basketModel.addItem(card.id);
	cardModal.setButtonState(basketModel.inBasket(card.id));
	modal.close();
});

events.on('basket:item-removed', (data: { card: IItem }) => {
	const { card } = data;
	basketModel.removeItem(card.id);
	cardModal.setButtonState(basketModel.inBasket(card.id));
	modal.close();
});

events.on('basket:changed', (data: { cards: string[] }) => {
	page.render({ counter: basketModel.getCount() });
	const { cards } = data;
	const items = cards.map((id) => {
		return catalogModel.getItem(id);
	});
	const cardsArray = basketModel.items.map((id, i) => {
		const cardBasket = new CardBasketView(
			cloneTemplate(cardBasketTemplate),
			events
		);
		const renderItem = catalogModel.getItem(id);
		return cardBasket.render({
			id: renderItem.id,
			title: renderItem.title,
			price: renderItem.price,
			index: i + 1,
		});
	});
	basket.setButtonState(basketModel.items);
	basketModel.calculateTotal(items);
	basket.render({ total: basketModel.total, items: cardsArray });
});

events.on('basket:open', () => {
	const cardsArray = basketModel.items.map((id, i) => {
		const cardBasket = new CardBasketView(
			cloneTemplate(cardBasketTemplate),
			events
		);
		const renderItem = catalogModel.getItem(id);
		return cardBasket.render({
			id: renderItem.id,
			title: renderItem.title,
			price: renderItem.price,
			index: i + 1,
		});
	});
	basket.setButtonState(basketModel.items);
	const modalContent = basket.render({ items: cardsArray });
	modal.render({ content: modalContent });
	modal.open();
});

events.on('delivery:open', () => {
	const modalContent = deliveryForm.render();
	modal.render({ content: modalContent });
});

events.on('contacts:open', () => {
	const modalContent = contactsForm.render();
	modal.render({ content: modalContent });
});

events.on(
	'delivery:change',
	({ field, value }: { field: string; value: TPayment | string }) => {
		orderModel.orderForm = { ...orderModel.orderForm, [field]: value };
		const error = orderModel.validateDelivery();
		deliveryForm.render({ error: error, valid: !error });
	}
);

events.on(
	'contacts:change',
	({ field, value }: { field: string; value: string }) => {
		orderModel.orderForm = { ...orderModel.orderForm, [field]: value };
		const error = orderModel.validateContacts();
		contactsForm.render({ error: error, valid: !error });
	}
);

events.on('order:ready', () => {
	const order: TOrder = {
		...orderModel.orderForm,
		items: basketModel.items,
		total: basketModel.total,
	};

	basketModel.clear();
	orderModel.clear();

	api
		.setOrder(order)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.error(err);
		});

	const modalContent = success.render({ total: order.total });
	modal.render({ content: modalContent });
});

events.on('success:close', () => {
	modal.close();
});
