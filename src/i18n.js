import i18n from "i18next";
import { reactI18nextModule } from 'react-i18next';

//import LanguageDetector from "i18next-browser-languagedetector";

i18n
.use(reactI18nextModule)
.init({
  // we init with resources
  lng: 'en',
  resources: {
    es: {
      translation: {
        "Ingresa": "Ingresa una película para empezar",
        "Director": "Director",
        "Directores": "Directores",
        "Duración": "Duración",
        "Reparto": "Reparto",
        "Ver mas": "Ver más",
        "Como": "como"
      }
    },
    en: {
      translation: {
        "Ingresa": "Enter a movie to get started",
        "Director": "Director",
        "Directores": "Directors",
        "Duración": "Runtime",
        "Reparto": "Cast",
        "Ver mas": "See more",
        "Como": "as"
      }
    }
  },

  fallbackLng: "en",
  
  interpolation: {
    escapeValue: false, // not needed for react!!
  }
  
});

export default i18n;
