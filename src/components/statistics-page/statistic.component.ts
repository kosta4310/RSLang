export { STATISTIC_TEMPLATE } from './statistic.template';
import { templateFooter } from '../footer/footer.template';
import { templateHeader } from '../header/header.template';
import { Header } from '../header/header.component';
import { STATISTIC_TEMPLATE } from './statistic.template';
import Plotly, { Data, Layout } from 'plotly.js-dist-min'


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
        setTimeout(() => {
            const trace1: Data = {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                type: 'scatter'
            };
                
            const trace2: Data = {
                x: [1, 2, 3, 4],
                y: [16, 5, 11, 9],
                type: 'scatter'
            };

            const layout1: Partial<Layout> = {
                xaxis: {
                    title: {
                        text: 'день изучения',
                        font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    },
                },
                yaxis: {
                    title: {
                        text: 'кол-во новых слов',
                        font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    }
                }
            };

            const layout2: Partial<Layout> = {
                xaxis: {
                    title: {
                        text: 'день изучения',
                        font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    },
                },
                yaxis: {
                    title: {
                        text: 'кол-во изученных слов',
                        font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    }
                }
            };


            Plotly.newPlot('plot1', [trace1], layout1);
            Plotly.newPlot('plot2', [trace2], layout2);
        }, 0);
    }
}
