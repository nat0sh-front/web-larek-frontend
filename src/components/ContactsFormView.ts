import { IEvents } from './base/events';
import { FormView } from './common/FormView';

export class ContactsFormView extends FormView {
    inputs: NodeListOf<HTMLInputElement>;

    constructor(form: HTMLFormElement, events: IEvents) {
        super(form, events);

        this.inputs = form.querySelectorAll('.form__input');

        this.form.addEventListener('submit', () => {
            events.emit('order:ready');
        })
    }
}
