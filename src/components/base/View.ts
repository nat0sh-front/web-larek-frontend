class View<T> {
    protected container: HTMLElement;
    
    constructor(container: HTMLElement | string) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) as HTMLElement
            : container;
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this, data);
        return this.container;
    }
}