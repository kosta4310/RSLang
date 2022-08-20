import { header } from './header.template';

export class Header {
    burger: HTMLElement | undefined;
    menu: HTMLElement | undefined;
    links: Array<HTMLElement> | undefined;

    init(): void {
        this.render();
        this.burger = <HTMLElement>document.querySelector('#burger');
        this.menu = <HTMLElement>document.querySelector('#menu');
        this.links = <Array<HTMLElement>>Array.from(document.querySelectorAll('#menu a'));
        this.listener();
    }

    render() {
        document.body.innerHTML = header;
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
    }

    openCloseMenu() {
        if ((<HTMLElement>this.menu).classList.contains('open')) {
            (<HTMLElement>this.burger).style.transform = 'rotate(0deg)';
            (<HTMLElement>this.menu).style.left = '-320px';
        } else {
            (<HTMLElement>this.burger).style.transform = 'rotate(90deg)';
            (<HTMLElement>this.menu).style.left = '0';
        }
        (<HTMLElement>this.menu).classList.toggle('open');
    }
}
