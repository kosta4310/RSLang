import { PAGINATION_BUTTONS, ELEMENTS } from './constants';
import { PAGINATION_TEMPLATE } from './pagination.template';
import { Book } from '../learnbook.component';
import { state } from '../../../state';

export class Pagination {
    totalElementsCount: number;
    elementsPerPage: number;
    pagesCount: number;
    parent: Book;
    currentPage = 1;

    constructor(
        parent: Book,
        totalElementsCount = ELEMENTS.totalElementsCount,
        elementsPerPage = ELEMENTS.elementsPerPage
    ) {
        this.totalElementsCount = totalElementsCount;
        this.elementsPerPage = elementsPerPage;
        this.pagesCount = Math.ceil(this.totalElementsCount / this.elementsPerPage);
        this.parent = parent;
        this.currentPage = this.parent.page + 1;
    }

    render() {
        const paginationBlock = <HTMLElement>document.querySelector('#pagination');
        paginationBlock.insertAdjacentHTML('beforeend', PAGINATION_TEMPLATE);

        this.redraw();
        this.listen();
    }

    renderStart() {
        const paginationBlock = <HTMLElement>document.querySelector('#pagination');
        const prev = <HTMLElement>paginationBlock.querySelector('.pagination__prev');
        prev.classList.add('disabled');
        const next = <HTMLElement>paginationBlock.querySelector('.pagination__next');
        next.classList.remove('disabled');
        const item2 = <HTMLElement>paginationBlock.querySelector('.pagination__2');
        item2.innerHTML = '2';
        item2.classList.remove('pagination__more');
        const item3 = <HTMLElement>paginationBlock.querySelector('.pagination__3');
        item3.innerHTML = '3';
        const item4 = <HTMLElement>paginationBlock.querySelector('.pagination__4');
        item4.innerHTML = '4';
        const item5 = <HTMLElement>paginationBlock.querySelector('.pagination__5');
        item5.innerHTML = '5';
        const item6 = <HTMLElement>paginationBlock.querySelector('.pagination__6');
        item6.innerHTML = PAGINATION_BUTTONS.MORE;
        item6.classList.add('pagination__more');
    }

    renderEnd() {
        const paginationBlock = <HTMLElement>document.querySelector('#pagination');
        const prev = <HTMLElement>paginationBlock.querySelector('.pagination__prev');
        prev.classList.remove('disabled');
        const next = <HTMLElement>paginationBlock.querySelector('.pagination__next');
        next.classList.add('disabled');
        const item2 = <HTMLElement>paginationBlock.querySelector('.pagination__2');
        item2.innerHTML = PAGINATION_BUTTONS.MORE;
        item2.classList.add('pagination__more');
        const item3 = <HTMLElement>paginationBlock.querySelector('.pagination__3');
        item3.innerHTML = '26';
        const item4 = <HTMLElement>paginationBlock.querySelector('.pagination__4');
        item4.innerHTML = '27';
        const item5 = <HTMLElement>paginationBlock.querySelector('.pagination__5');
        item5.innerHTML = '28';
        const item6 = <HTMLElement>paginationBlock.querySelector('.pagination__6');
        item6.innerHTML = '29';
        item6.classList.remove('pagination__more');
    }

    renderMiddle(page: number) {
        const paginationBlock = <HTMLElement>document.querySelector('#pagination');
        const prev = <HTMLElement>paginationBlock.querySelector('.pagination__prev');
        prev.classList.remove('disabled');
        const next = <HTMLElement>paginationBlock.querySelector('.pagination__next');
        next.classList.remove('disabled');
        const item2 = <HTMLElement>paginationBlock.querySelector('.pagination__2');
        item2.innerHTML = PAGINATION_BUTTONS.MORE;
        item2.classList.add('pagination__more');
        const item3 = <HTMLElement>paginationBlock.querySelector('.pagination__3');
        item3.innerHTML = (page - 1).toString();
        const item4 = <HTMLElement>paginationBlock.querySelector('.pagination__4');
        item4.innerHTML = page.toString();
        const item5 = <HTMLElement>paginationBlock.querySelector('.pagination__5');
        item5.innerHTML = (page + 1).toString();
        const item6 = <HTMLElement>paginationBlock.querySelector('.pagination__6');
        item6.innerHTML = PAGINATION_BUTTONS.MORE;
        item6.classList.add('pagination__more');
    }

    redraw(display = true) {
        const pagination = <HTMLElement>document.querySelector('#pagination');
        const paginationContainer = <HTMLElement>document.querySelector('.pagination__container');
        if (!display) {
            paginationContainer.classList.add('hidden');
            return;
        } else {
            paginationContainer.classList.remove('hidden');
        }
        if (this.currentPage <= PAGINATION_BUTTONS.PAGE_FOR_RENDER_START) {
            this.renderStart();
        } else if (this.currentPage > PAGINATION_BUTTONS.PAGE_FOR_RENDER_END) {
            this.renderEnd();
        } else {
            this.renderMiddle(this.currentPage);
        }
        const items = <NodeListOf<HTMLElement>>pagination.querySelectorAll('.pagination__item');
        items.forEach((i) => {
            if (i.innerText === this.currentPage.toString()) {
                i.classList.add('pagination_selected');
            } else {
                i.classList.remove('pagination_selected');
            }
        });
    }

    listen() {
        const pagination = <HTMLElement>document.querySelector('#pagination');
        pagination.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('pagination__item')) {
                if (
                    !(
                        target.classList.contains('pagination__prev') ||
                        target.classList.contains('pagination__next') ||
                        target.classList.contains('pagination__more')
                    )
                ) {
                    this.currentPage = +target.innerText;
                    console.log(state.getItem('page'));
                    
                    this.redraw();
                    
                    this.parent.page = this.currentPage - 1;
                    state.setItem({ page: this.parent.page.toString() });
                    this.parent.renderWords();
                }

                if (target.classList.contains('pagination__next')) {
                    if (target.classList.contains('disabled')) return;
                    this.currentPage += 1;
                    this.redraw();
                    this.parent.page = this.currentPage - 1;
                    this.parent.renderWords();
                }
                if (target.classList.contains('pagination__prev')) {
                    if (target.classList.contains('disabled')) return;
                    this.currentPage -= 1;
                    this.redraw();
                    this.parent.page = this.currentPage - 1;
                    this.parent.renderWords();
                }
            }
        });
    }
}
