import { templateFooter } from './../footer/footer.template';
import { templateHeader } from './../header/header.template';
import { Header } from './../header/header.component';
import { AUTHORIZATION_TEMPLATE } from './authorization.template';


export class Authorization {
    header: Header;
    constructor() {
        this.header = new Header();
    }
    init() {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        this.render();
        body.insertAdjacentHTML('beforeend', templateFooter);
    }
    render() {
        document.body.insertAdjacentHTML('beforeend', AUTHORIZATION_TEMPLATE);
        this.activeLink();
    }

    activeLink() {
        (<HTMLElement>document.querySelector('.links-btn')).addEventListener('click', (event) => {
            const target = event?.target as HTMLElement;
            if (target.classList.contains('links-btn__signUp')) {
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.add('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.add('form-signUp-left');
            }
            if (target.classList.contains('links-btn__signIn')) {
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.remove('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.remove('form-signUp-left');
            }
        });
    }
}
