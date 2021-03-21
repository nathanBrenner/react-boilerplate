import path from 'path'
import Dotenv from 'dotenv-webpack'
import webpack from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const BUILD_DIR = path.join(__dirname, '../', 'build')

const dotEnvDev = new Dotenv({
  path: path.resolve(__dirname, './.env.development'),
})

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [dotEnvDev, new ForkTsCheckerWebpackPlugin({ async: false })],
  devServer: {
    port: 9000,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    proxy: { '/api/**': { target: 'http://localhost:3000', secure: false } },
  },
}

export default config
