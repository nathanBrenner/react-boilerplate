import path from 'path'
import Dotenv from 'dotenv-webpack'
import webpack from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env.production'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
}

export default config
