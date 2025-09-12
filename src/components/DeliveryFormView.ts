import { TPayment } from '../types';
import { IEvents } from './base/events';
import { FormView } from './common/FormView';

export class DeliveryFormView extends FormView {
	protected paymentButtons: NodeListOf<HTMLButtonElement>;
	protected addressInput: HTMLInputElement;

	constructor(form: HTMLFormElement, events: IEvents) {
		super(form, events);

		this.paymentButtons = form.querySelectorAll('.button_alt');
		this.addressInput = form.querySelector('.form__input');

		this.form.addEventListener('submit', () => {
			events.emit('contacts:open');
		})

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const selectedPayment = button.textContent?.trim() as TPayment;

				this.paymentButtons.forEach((b) =>
					b.classList.remove('button_alt-active')
				);
				button.classList.add('button_alt-active');

				this.events.emit(`${form.name}:change`, {
					field: 'payment',
					value: selectedPayment,
				});
				console.log({
					field: 'payment',
					value: selectedPayment,
				});
			});
		});
	}
}
