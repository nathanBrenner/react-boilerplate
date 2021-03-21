const staging = {
  url: {
    API_URL: 'https://www.staging.hellolanding.com',
    PAGE_URL: 'https://www.staging.hellolanding.com',
    PAGE_ROUTE: '/apartments/find-a-landing',
  },
}
const dev = {
  url: {
    API_URL: 'http://localhost:3000',
    PAGE_URL: 'https://www.staging.hellolanding.com',
    PAGE_ROUTE: '/',
  },
}

const production = {
  url: {
    API_URL: 'https://www.hellolanding.com',
    PAGE_URL: 'https://www.hellolanding.com',
    PAGE_ROUTE: '/apartments/find-a-landing',
  },
}
export const config =
  process.env.NODE_ENV === 'development' ? dev : process.env.NODE_ENV === 'production' ? production : staging
