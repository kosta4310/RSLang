export { STATISTIC_TEMPLATE } from './statistic.template';
import { templateFooter } from '../footer/footer.template';
import { templateHeader } from '../header/header.template';
import { Header } from '../header/header.component';
import { STATISTIC_TEMPLATE } from './statistic.template';


export class Statistic {
    header: Header;
    constructor() {
        this.header = new Header();
    }
    init() {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        this.render();
        body.insertAdjacentHTML('beforeend', templateFooter);
    }

    render() {
      document.body.insertAdjacentHTML('beforeend', STATISTIC_TEMPLATE(20,25));
  }
}
