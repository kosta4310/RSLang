import { PAGINATION_BUTTONS } from './constants';
import './pagination.style.scss';

export const PAGINATION_TEMPLATE = `
<div class="pagination__container">
  <div class="pagination__item pagination__prev disabled">${PAGINATION_BUTTONS.PREV}</div>
  <div class="pagination__item pagination__1 pagination__first">1</div>
  <div class="pagination__item pagination__2">2</div>
  <div class="pagination__item pagination__3">3</div>
  <div class="pagination__item pagination__4">4</div>
  <div class="pagination__item pagination__5">5</div>
  <div class="pagination__item pagination__6 pagination__more">${PAGINATION_BUTTONS.MORE}</div>
  <div class="pagination__item pagination__last">30</div>
  <div class="pagination__item pagination__next">${PAGINATION_BUTTONS.NEXT}</div>
</div>`