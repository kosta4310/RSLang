import { StatusCodes } from 'http-status-codes';
import { templateFooter } from './../footer/footer.template';
import { templateHeader } from './../header/header.template';
import { Header } from './../header/header.component';
import { AUTHORIZATION_TEMPLATE } from './authorization.template';
import { createUser, signIn } from '../api/api';

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
        this.signUp();
        this.signIn();
    }

    activeLink() {
        (<HTMLElement>document.querySelector('.links-btn')).addEventListener('click', (event) => {
            const target = event?.target as HTMLElement;
            if (target.classList.contains('links-btn__signUp')) {
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.add('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.add('form-signUp-left');
                (<HTMLInputElement>document.querySelector('.email-signIn')).value = '';
                (<HTMLInputElement>document.querySelector('.password-signIn')).value = '';
            }
            if (target.classList.contains('links-btn__signIn')) {
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.remove('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.remove('form-signUp-left');
                (<HTMLInputElement>document.querySelector('.name-signUp')).value = '';
                (<HTMLInputElement>document.querySelector('.email-signUp')).value = '';
                (<HTMLInputElement>document.querySelector('.password-signUp')).value = '';
            }
        });
    }

    signUp() {
        document.querySelector('.form-signUp')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (<HTMLInputElement>document.querySelector('.name-signUp')).value;
            const email = (<HTMLInputElement>document.querySelector('.email-signUp')).value;
            const password = (<HTMLInputElement>document.querySelector('.password-signUp')).value;
            createUser({ name, email, password }).then((res) => {
                if (typeof res === 'number') {
                    switch (res) {
                        case StatusCodes.EXPECTATION_FAILED:
                            alert(`This user already exists`);
                            break;
                        case StatusCodes.UNPROCESSABLE_ENTITY:
                            alert(`Incorrect e-mail or password`);
                            break;
                        default:
                            break;
                    }
                } else {
                    signIn({ name, email, password }).then((res) => {
                        localStorage.setItem('rsLang', JSON.stringify({ auth: res, isAuth: true }));
                        document.location.href = '/';
                    });
                }
            });
        });
    }
    signIn() {
        document.querySelector('.form-signIn')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = (<HTMLInputElement>document.querySelector('.email-signIn')).value;
            const password = (<HTMLInputElement>document.querySelector('.password-signIn')).value;
            signIn({ name: '', email, password }).then((res) => {
                if (typeof res === 'number') {
                    switch (res) {
                        case StatusCodes.NOT_FOUND:
                            alert(`There is no such user`);
                            break;
                        case StatusCodes.FORBIDDEN:
                            alert(`Incorrect e-mail or password`);
                            break;
                        default:
                            break;
                    }
                } else {
                    localStorage.setItem('rsLang', JSON.stringify({ auth: res, isAuth: true }));
                    document.location.href = '/';
                }
            });
        });
    }
}
