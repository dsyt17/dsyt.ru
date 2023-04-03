import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { en } from './translations/en';
import { ru } from './translations/ru';

const resources = {
    en: {
        translation: en,
    },
    ru: {
        translation: ru,
    },
};

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
