import dotenv from 'dotenv'
dotenv.config()
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'user-manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/sitemap', '@nuxtjs/google-analytics', '@nuxtjs/robots'],
  robots: {
    UserAgent: '*',
    Disallow: ''
  },
  components: true,
  loading: false,
  css: ['~/assets/css/style.css'],
  plugins: ['~/plugins/element-ui/element-ui.js', '~/plugins/event-bus.js', '~/plugins/directive/directive.js', '~/plugins/filter/index.js', '~/plugins/utils/auth.js'],
  /*
  ** Build configuration
  */
  env: {
    baseURL: process.env.BASE_URL_PRODUCTION || 'http://localhost:3000',
    fbApiKey: 'AIzaSyAtrM-ze9f_Q-sDBOzldQBI9Tir0nXV5a8'
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

