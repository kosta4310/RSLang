import { IndexObject, StateParam } from './components/types';

export const state = {
    isAuth() {
        const rsLangString = localStorage.getItem('rslang');
        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang.auth;
        }
        return false;
    },
    // page: 0,
    // complexity: 0,
    isFromBook: false,

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
        console.log(`storage ${rsLangString}`);

        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang[key];
        }
    },
    // learnBookGame: false,
    complexityMainGame: 0,
};
