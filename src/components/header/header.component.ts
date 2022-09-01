import { state } from '../../state';

export class Header {
    burger: HTMLElement | undefined;
    menu: HTMLElement | undefined;
    links: Array<HTMLElement> | undefined;

    init(): void {
        this.burger = <HTMLElement>document.querySelector('#burger');
        this.menu = <HTMLElement>document.querySelector('#menu');
        this.links = <Array<HTMLElement>>Array.from(document.querySelectorAll('#menu a'));
        this.listener();
        this.checkAuthorization();
    }

    listener() {
        (<HTMLElement>this.burger).addEventListener('click', (e) => {
            e.stopPropagation();
            this.openCloseMenu();
        });

        document.addEventListener('click', () => {
            if ((<HTMLElement>this.menu).classList.contains('open')) this.openCloseMenu();
        });

        (<Array<HTMLElement>>this.links).map((link) => link.addEventListener('click', () => this.openCloseMenu()));

        document.querySelector('.audio-call')?.addEventListener('click', () => {
            if (document.location.hash === '#/audio-call') {
                location.reload();
            }
        });

        document.querySelector('.sprint')?.addEventListener('click', () => {
            if (document.location.hash === '#/sprint') {
                location.reload();
            }
        });
    }
    openCloseMenu() {
        if ((<HTMLElement>this.menu).classList.contains('open')) {
            (<HTMLElement>this.burger).style.transform = 'rotate(0deg)';
            (<HTMLElement>this.menu).style.left = '-36rem';
        } else {
            (<HTMLElement>this.burger).style.transform = 'rotate(90deg)';
            (<HTMLElement>this.menu).style.left = '0';
        }
        (<HTMLElement>this.menu).classList.toggle('open');
    }
    checkAuthorization() {
        if (state.getItem('isAuth')) {
            const authBtn = <HTMLAnchorElement>document.querySelector('.btn-enter');
            authBtn.innerHTML = 'Выйти';
            authBtn.href = '/';
            authBtn.addEventListener('click', () => {
                state.delItem('auth');
                state.delItem('isAuth');
                authBtn.innerHTML = 'Войти';
                setTimeout(() => {
                    authBtn.href = '/auth';
                }, 0);
            });
        }
    }
}
