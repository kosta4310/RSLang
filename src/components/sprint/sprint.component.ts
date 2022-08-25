import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { SPRINT_TEMPLATE } from './sprint.template';

export class Sprint {
    header: Header;
    constructor() {
        this.header = new Header();
    }

    init() {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        body.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);
    }
}
