import { IndexObject } from './components/types';

export const state = {
    isFromBook: false,
    complexityMainGame: 0,
    isGame:false,

    init() {
        const page = this.getItem('page') ?? '0';
        const complexity = this.getItem('complexity') ?? '0';
        this.setItem({ page: page, complexity: complexity });
    },

    reset() {
        this.setItem({ page: '0', complexity: '0' });
    },

    setItem(data: IndexObject) {
        const rsLangString = localStorage.getItem('rsLang');

        if (rsLangString) {
            const rsLangObject: IndexObject = JSON.parse(rsLangString);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    rsLangObject[key] = data[key];
                }
            }
            localStorage.setItem('rsLang', JSON.stringify(rsLangObject));
        } else {
            localStorage.setItem('rsLang', JSON.stringify(data));
        }
    },

    getItem(key: string) {
        const rsLangString = localStorage.getItem('rsLang');

        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang[key];
        }
    },

    delItem(key: string) {
        const rsLangString = localStorage.getItem('rsLang');

        if (rsLangString) {
            const rsLangObject: IndexObject = JSON.parse(rsLangString);
            delete rsLangObject[key];
            localStorage.setItem('rsLang', JSON.stringify(rsLangObject));
        }
    },
};
