import { StateParam } from './components/types';

export const state = {
    isAuth() {
        const rsLangString = localStorage.getItem('rslang');
        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang.auth;
        }
        return false;
    },
    page: 0,
    complexity: 0,

    setItem(data: Partial<StateParam>) {
        localStorage.setItem('rsLang', JSON.stringify(data));
    },
    getItem(key: string) {
        const rsLangString = localStorage.getItem('rsLang');

        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang[key];
        }
    },
};
