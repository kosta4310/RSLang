import { Book } from './classLearnBook';
import './pagination.style.scss'

export class Pagination {
  totalElementsCount: number;
  elementsPerPage: number;
  pagesCount: number;
  parent: Book;
  
  constructor(parent: Book, totalElementsCount = 600, elementsPerPage = 20) {
    this.totalElementsCount = totalElementsCount;
    this.elementsPerPage = elementsPerPage;
    this.pagesCount = Math.ceil(this.totalElementsCount / this.elementsPerPage);
    this.parent = parent;
  }

  render() {
    const template = `
    <div class="pagination__container">
      <div class="pagination__prev disabled">❮</div>
      <div class="pagination__1 pagination__first selected">1</div>
      <div class="pagination__2">2</div>
      <div class="pagination__3">3</div>
      <div class="pagination__4">4</div>
      <div class="pagination__5">5</div>
      <div class="pagination__6">…</div>
      <div class="pagination__7 pagination__last">30</div>
      <div class="pagination__next">❯</div>
    </div>`

    const paginationBlock = <HTMLElement>document.querySelector('#pagination');
    paginationBlock.insertAdjacentHTML('beforeend', template);
  }
}