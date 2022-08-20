import { header } from './header.template';

document.body.innerHTML = header;

const burger = <HTMLElement>document.querySelector('#burger');
const menu = <HTMLElement>document.querySelector('#menu');
const links = <Array<HTMLElement>>Array.from(document.querySelectorAll('#menu a'));

burger.addEventListener('click', (e) => {
    e.stopPropagation();
    openCloseMenu();
});

document.addEventListener('click', (e) => {
    if (menu.classList.contains('open')) openCloseMenu();
});

links.map((link) => link.addEventListener('click', () => openCloseMenu()));

export function openCloseMenu() {
    if (menu.classList.contains('open')) {
        burger.style.transform = 'rotate(0deg)';
        menu.style.left = '-320px';
    } else {
        burger.style.transform = 'rotate(90deg)';
        menu.style.left = '0';
    }
    menu.classList.toggle('open');
}
