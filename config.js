const staging = {
  url: {},
}
const dev = {
  url: {},
}

const production = {
  url: {},
}
export const config =
  process.env.NODE_ENV === 'development' ? dev : process.env.NODE_ENV === 'production' ? production : staging
