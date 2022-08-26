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
    setItem(data = { page: 0, complexity: 0 }) {
        localStorage.setItem('rsLang', JSON.stringify(data));
    },
    getItem(key: string) {
        const rsLangString = localStorage.getItem('rslang');
        if (rsLangString) {
            const rsLang = JSON.parse(rsLangString);
            return rsLang[key];
        }
    },
};
