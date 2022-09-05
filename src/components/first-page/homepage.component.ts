import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { templateFooter } from '../footer/footer.template';
import { templateSlogan } from './template.elements/slogan.template';
import { templateCapabilities } from './template.elements/capabilities.template';
import { templateOurTeam } from './template.elements/ourteam.template';
import { state } from '../../state';

export class HomePage {
    header: Header;
    constructor() {
        this.header = new Header();
    }
    init() {
        const doc = document.body;
        doc.innerHTML = '';
        doc.insertAdjacentHTML('afterbegin', templateOurTeam);
        doc.insertAdjacentHTML('afterbegin', templateCapabilities);
        doc.insertAdjacentHTML('afterbegin', templateSlogan);
        doc.insertAdjacentHTML('afterbegin', templateHeader);
        doc.insertAdjacentHTML('beforeend', templateFooter);
        this.header.init();
        this.listen();
    }

    listen() {
        document.querySelector('.ca-item[href="/audio-call"]')?.addEventListener('click', () => {
            state.setItem({ isFromBook: false });
        });
        
        document.querySelector('.ca-item[href="/sprint"]')?.addEventListener('click', () => {
            state.setItem({ isFromBook: false });
        });
    }
}
