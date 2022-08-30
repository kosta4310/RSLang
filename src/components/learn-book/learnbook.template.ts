import './learnbook.style.scss'
import { templateFooter } from '../footer/footer.template';

// cвойство data-complexity у контейнера вспомогательное, мы по нему фон меняем в случае если все слова изученные на странице
// см. learnbook.style.scss
export const LEARNBOOK_PAGE_TEMPLATE = `
<div class="wrapper-book all-learned" data-complexity="0">
    <div class="container learnbook-container">
        <div id="control-panel"></div>
        <div id="words" class="card-words">
        </div>
        <div id="pagination"></div>
    </div>
    ${templateFooter}
</div>`