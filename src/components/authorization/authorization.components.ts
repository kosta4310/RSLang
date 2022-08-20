import { AUTHORIZATION_TEMPLATE } from './authorization.template';
export class Authorization {
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

                console.log(1);
            }
            if (target.classList.contains('links-btn__signIn')) {
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.remove('form-signIn-left');
            }
            console.log(target);
        });
    }
}
