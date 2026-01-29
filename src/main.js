import "./main.css";
import "animate.css";
import "flowbite/dist/flowbite";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import router from "./router";
import App from "./App.vue";

import fr from "./locales/fr.json";
import en from "./locales/en.json";

const queryLanguage = new URLSearchParams(window.location.search).get("lang");
const browserLanguage = navigator.language.slice(0, 2);
const i18n = createI18n({
  locale:
    localStorage.getItem("locale") || queryLanguage || browserLanguage || "en",
  fallbackLocale: queryLanguage || browserLanguage || "en",
  warnHtmlMessage: false,
  messages: {
    en: en,
    fr: fr,
  },
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app");
