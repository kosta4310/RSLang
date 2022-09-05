import './learnbook.style.scss';
import { templateFooter } from '../footer/footer.template';

export const LEARNBOOK_PAGE_TEMPLATE = `
<div class="wrapper-book" data-complexity="0">
    <div class="container learnbook-container">
        <div id="control-panel"></div>
        <div id="words" class="card-words">
        </div>
        <div id="pagination"></div>
    </div>
    ${templateFooter}
</div>`;
