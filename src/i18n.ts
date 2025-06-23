import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      OMS: "OMS",
      Username: "Username",
      Password: "Password",
      Login: "Login"
    }
  }
})