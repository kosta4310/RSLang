const burger = <HTMLElement>document.querySelector('#burger');
const menu = <HTMLElement>document.querySelector('#menu');

burger.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
        burger.style.transform = 'rotate(0deg)';
        menu.style.left = '-320px';
        console.log('0');
    } else {
        burger.style.transform = 'rotate(90deg)';
        menu.style.left = '0';
        //   menu.style.display = 'block';
        console.log('90');
    }

    menu.classList.toggle('open');
});
