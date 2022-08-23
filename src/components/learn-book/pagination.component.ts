import './pagination.style.scss'

export class Pagination {
  totalElementsCount: number
  elementsPerPage: number
  pagesCount: number
  constructor(totalElementsCount = 0, elementsPerPage = 10) {
    this.totalElementsCount = totalElementsCount
    this.elementsPerPage = elementsPerPage
    this.pagesCount = Math.ceil(this.totalElementsCount / this.elementsPerPage)
  }

  render() {
    return `
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
  }
}