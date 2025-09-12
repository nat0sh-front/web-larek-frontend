import { IOrderForm } from '../../types';
import { IEvents } from '../base/events';
import { View } from '../base/View';

interface IForm {
	valid: boolean;
	error: string;
}

export class FormView extends View<IForm> {
	protected submitButton: HTMLButtonElement;
	protected _error: HTMLElement;
	protected events: IEvents;

	constructor(protected form: HTMLFormElement, events: IEvents) {
		super(form);
		this.events = events;

		this.submitButton = form.querySelector('button[type="submit"]');
		this._error = form.querySelector('.form__errors');

		this.form.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			if (!target.name) return;

			const field = target.name as keyof IOrderForm;
			const value = target.value;
			this.events.emit(`${this.form.name}:changed`, {
				field,
				value,
			});
		});

		this.form.addEventListener('submit', (e: Event) => {
			e.preventDefault();
		});
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	set error(value: string) {
		this._error.textContent = value;
	}
}
