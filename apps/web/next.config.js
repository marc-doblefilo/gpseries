// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nx/next/plugins/with-nx');

module.exports = withNx({
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
});
