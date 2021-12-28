const { createApp } = Vue;
const { createI18n } = VueI18n;

const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      message: {
        language: "Language",
        hello: "Hello!",
      },
    },
    ca: {
      message: {
        language: "Idioma",
        hello: "Hola",
      },
    },
  },
});

const app = createApp({});
app.use(i18n);
app.mount("#app");
