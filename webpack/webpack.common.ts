import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'
import wmp from 'webpack-manifest-plugin'

const SRC_DIR = path.join(__dirname, '../', 'src')
const BUILD_DIR = path.join(__dirname, '../', 'build')

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(SRC_DIR, 'index.html'),
  filename: 'index.html',
  hash: true,
})

const cleanWebpackPlugin = new CleanWebpackPlugin()

const config: webpack.Configuration = {
  entry: ['react-hot-loader/patch', path.join(SRC_DIR, 'index.tsx')],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'apartments/images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['*', '.js', '.tsx', '.ts'],
  },
  output: {
    path: BUILD_DIR,
    filename: 'apartments/js/[name].js',
    publicPath: '/',
  },
  plugins: [
    htmlPlugin,
    cleanWebpackPlugin,
    new MiniCssExtractPlugin({ filename: 'apartments/css/main.[chunkhash].css' }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new wmp.WebpackManifestPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

if (process.env.NODE_ENV === 'development') {
  config.entry = path.join(SRC_DIR, 'ClientApp.tsx')
}

export default config
