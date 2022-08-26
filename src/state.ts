export const state = {
    isAuth() {
        const rsLang = localStorage.getItem('rslang');
        return !!rsLang;
    },
    learnBookGame:false,
    complexityMainGame:0
};
