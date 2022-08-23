import { Book } from './classLearnBook';
import './pagination.style.scss'

const PREV = '❮'
const NEXT = '❯'
const MORE = '…'

export class Pagination {
  totalElementsCount: number;
  elementsPerPage: number;
  pagesCount: number;
  parent: Book;
  currentPage = 1;

  constructor(parent: Book, totalElementsCount = 600, elementsPerPage = 20) {
    this.totalElementsCount = totalElementsCount;
    this.elementsPerPage = elementsPerPage;
    this.pagesCount = Math.ceil(this.totalElementsCount / this.elementsPerPage);
    this.parent = parent;
  }

  render() {
    const template = `
    <div class="pagination__container">
      <div class="pagination__item pagination__prev disabled">${PREV}</div>
      <div class="pagination__item pagination__1 pagination__first">1</div>
      <div class="pagination__item pagination__2">2</div>
      <div class="pagination__item pagination__3">3</div>
      <div class="pagination__item pagination__4">4</div>
      <div class="pagination__item pagination__5">5</div>
      <div class="pagination__item pagination__6 pagination__more">${MORE}</div>
      <div class="pagination__item pagination__last">30</div>
      <div class="pagination__item pagination__next">${NEXT}</div>
    </div>`

    const paginationBlock = <HTMLElement>document.querySelector('#pagination');
    paginationBlock.insertAdjacentHTML('beforeend', template);

    const firstItem = <HTMLElement>document.querySelector('.pagination__first');
    firstItem.classList.add('pagination_selected');
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
    item6.innerHTML = MORE;
    item6.classList.add('pagination__more');
  }

  renderEnd() {
    const paginationBlock = <HTMLElement>document.querySelector('#pagination');
    const prev = <HTMLElement>paginationBlock.querySelector('.pagination__prev');
    prev.classList.remove('disabled');
    const next = <HTMLElement>paginationBlock.querySelector('.pagination__next');
    next.classList.add('disabled');
    const item2 = <HTMLElement>paginationBlock.querySelector('.pagination__2');
    item2.innerHTML = MORE;
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
    item2.innerHTML = MORE;
    item2.classList.add('pagination__more');
    const item3 = <HTMLElement>paginationBlock.querySelector('.pagination__3');
    item3.innerHTML = (page - 1).toString();
    const item4 = <HTMLElement>paginationBlock.querySelector('.pagination__4');
    item4.innerHTML = page.toString();
    const item5 = <HTMLElement>paginationBlock.querySelector('.pagination__5');
    item5.innerHTML = (page + 1).toString();
    const item6 = <HTMLElement>paginationBlock.querySelector('.pagination__6');
    item6.innerHTML = MORE;
    item2.classList.add('pagination__more');
  }

  redraw() {
    if (this.currentPage <= 4) {
      this.renderStart();
    }
    else if (this.currentPage > 26) {
      this.renderEnd();
    } else {
      this.renderMiddle(this.currentPage)
    }
    const pagination = <HTMLElement>document.querySelector('#pagination');
    const items = <NodeListOf<HTMLElement>>pagination.querySelectorAll('.pagination__item');
    items.forEach(i => {
      if (i.innerText === this.currentPage.toString()) {
        i.classList.add('pagination_selected')
      } else {
        i.classList.remove('pagination_selected')
      }
    })  
  }

  listen() {
    const pagination = <HTMLElement>document.querySelector('#pagination');
    pagination.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('pagination__item')) {
        if (!(target.classList.contains('pagination__prev') 
          || target.classList.contains('pagination__next') 
          || target.classList.contains('pagination__more'))) {
          this.currentPage = +target.innerText;
          this.redraw();
                    

          this.parent.page = this.currentPage - 1;
          this.parent.renderWords();
        }

        if (target.classList.contains('pagination__next')) {
          if(target.classList.contains('disabled')) return;
          this.currentPage += 1;
          this.redraw();
          this.parent.page = this.currentPage - 1;
          this.parent.renderWords();
        }
        if (target.classList.contains('pagination__prev')) {
          if(target.classList.contains('disabled')) return;
          this.currentPage -= 1;
          this.redraw();
          this.parent.page = this.currentPage - 1;
          this.parent.renderWords();
        }
      }
    })
  }
}