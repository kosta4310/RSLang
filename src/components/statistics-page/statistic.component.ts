export { STATISTIC_TEMPLATE } from './statistic.template';
import { templateFooter } from '../footer/footer.template';
import { templateHeader } from '../header/header.template';
import { Header } from '../header/header.component';
import { STATISTIC_TEMPLATE } from './statistic.template';
import Plotly, { Data, Layout } from 'plotly.js-dist-min';
import * as API from '../api/api';
import { state } from '../../state';
import { Constants, IOptionalToStatistic, IStatisticDataAll, IStatisticGamePerDay } from '../types';

export class Statistic {
    header: Header;

    constructor() {
        this.header = new Header();
    }

    async init() {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        const { initDataStatistic } = await this.getStatisticGamePerDay();
        const statisticDataAll = await this.getStatisticDataAll();
        this.render(initDataStatistic, statisticDataAll);
        body.insertAdjacentHTML('beforeend', templateFooter);
    }

    render(statisticGamePerDay: IStatisticGamePerDay, statisticDataAll: IStatisticDataAll) {
        document.body.insertAdjacentHTML('beforeend', STATISTIC_TEMPLATE(statisticGamePerDay, statisticDataAll));

        this.getStatisticAllDays().then((res) => {
            console.log(res);
            this.showGraphics(res);
        });
    }

    async getStatisticGamePerDay() {
        const { userId, token } = state.getItem('auth');
        const response = await API.getStatistics(userId, token);
        console.log(response);

        const currentDay = new Date().toISOString().slice(0, 10);

        const initDataStatistic = <IStatisticGamePerDay>{
            learnedWords: 0,
            sprintCorrect: 0,
            sprintTotal: 0,
            sprintNewWords: 0,
            audioCallNewWords: 0,
            sprintCorrectInLineCount: 0,
            audioCallCorrectInLineCount: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
        };
        if (typeof response === 'string') {
            return { learnedWords: 0, initDataStatistic };
        } else {
            const { learnedWords, optional } = response;
            // eslint-disable-next-line no-prototype-builtins
            if (optional.hasOwnProperty(currentDay)) {
                Object.assign(initDataStatistic, optional[currentDay]);
            }

            return { learnedWords, initDataStatistic };
        }
    }

    async getStatisticDataAll() {
        const { learnedWords, initDataStatistic } = await this.getStatisticGamePerDay();
        const quantityNewWord = initDataStatistic.audioCallNewWords + initDataStatistic.sprintNewWords;
        const rateRightAnswers = Math.floor(
            (initDataStatistic.audioCallCorrect +
                initDataStatistic.sprintCorrect / (initDataStatistic.audioCallTotal + initDataStatistic.sprintTotal)) *
                100
        );

        return { learnedWords, quantityNewWord, rateRightAnswers };
    }

    async getStatisticAllDays() {
        const { userId, token } = state.getItem('auth');
        const response = await API.getStatistics(userId, token);

        if (typeof response === 'string') {
            return Constants.STATUS_CODE_NULL_DATA;
        } else {
            const { optional } = response;

            return optional;
        }
    }

    showGraphics(dataAll: IOptionalToStatistic | Constants.STATUS_CODE_NULL_DATA) {
        let trace1: Data;
        let trace2: Data;

        if (dataAll === Constants.STATUS_CODE_NULL_DATA) {
            trace1 = {
                x: [0],
                y: [0],
                type: 'scatter',
            };

            trace2 = {
                x: [0],
                y: [0],
                type: 'scatter',
            };
        } else {
            delete dataAll['2021-09-01'];

            const orderedData = <IOptionalToStatistic>Object.keys(dataAll)
                .sort()
                .reduce((acc: IOptionalToStatistic, key) => {
                    acc[key] = dataAll[key];
                    return acc;
                }, {});
            let keys = Object.keys(orderedData);
            const obj = Object.values(orderedData);
            const value1 = obj.map((val) => val.sprintNewWords + val.audioCallNewWords);
            const value2 = obj.map((val) => val.learnedWords);

            keys = keys.splice(-10);
            console.log(`value1: ${value1}, value2: ${value2}`);

            trace1 = {
                x: keys,
                y: value1,
                type: 'scatter',
            };

            trace2 = {
                x: keys,
                y: value2,
                type: 'scatter',
            };
        }

        const layout1: Partial<Layout> = {
            xaxis: {
                title: {
                    text: 'день изучения',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f',
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'кол-во новых слов',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f',
                    },
                },
            },
        };

        const layout2: Partial<Layout> = {
            xaxis: {
                title: {
                    text: 'день изучения',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f',
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'кол-во изученных слов',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f',
                    },
                },
            },
        };

        Plotly.newPlot('plot1', [trace1], layout1);
        Plotly.newPlot('plot2', [trace2], layout2);
    }
}
