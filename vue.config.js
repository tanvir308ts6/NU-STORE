module.exports = {
  lintOnSave: false,

  devServer: {
    host: "localhost",
    // proxy: "http://localhost:8000"
    // proxy: "http://103.4.145.242:8006"
    // proxy: "http://103.113.200.43:8006"
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
