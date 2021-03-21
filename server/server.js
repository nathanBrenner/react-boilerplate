import express from 'express'
// import { ServerLocation } from '@reach/router'
import fs from 'fs'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as fetch from 'node-fetch'
import * as path from 'path'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { config } from '../config'
import App from '../src/App'
const { API_URL, PAGE_ROUTE } = config.url
const __dirname = path.resolve(path.dirname(''))
const BUILD_DIR = path.join(__dirname, '', 'build')
let html = fs.readFileSync(path.join(BUILD_DIR, 'index.html')).toString()

function fetchMarketData() {
  const requestHeaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      accept: 'json',
    },
  }
  return fetch(new URL(`${API_URL}/api/v1/markets.json`), requestHeaders)
    .then((response) => response.json())
    .then((result) => {
      const marketsData = result?.data?.markets.map((market) => ({
        ...market,
        id: Number(market.id),
        name: market?.name,
      }))
      return marketsData
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

const app = express()
app.use(express.static('./build'))
app.use('*/images', express.static('./build/apartments/images'))
app.use('*/css', express.static('./build/apartments/css'))
app.use('*/js', express.static('./build/apartments/js'))

app.get([`${PAGE_ROUTE}`, '/'], async (req, res) => {
  // console.info(req)
  app.use('/api', createProxyMiddleware({ target: `${API_URL}`, changeOrigin: true }))
  let componentData = null
  componentData = await fetchMarketData()
  html = html.replace('var HEAP_ID = null', `const HEAP_ID = ${process.env.HEAP_ID}`)
  html = html.replace('var initial_state = null', `var initial_state = ${JSON.stringify(componentData)}`)
  const parts = html.split('not rendered')
  res.write(parts[0])
  const stream = renderToNodeStream(<App staticContext={componentData} />)
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    res.write(parts[1])
    res.end()
  })
})

const PORT = process.env.PORT || 3031
console.log(`listening on ${PORT}`)
console.log(PAGE_ROUTE)
console.log(API_URL)
app.listen(PORT, function listenHandler() {
  console.info(`Running on ${PORT}...`)
})

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  process.exit(1)
})
