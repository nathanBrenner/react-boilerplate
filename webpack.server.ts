import path from 'path'
import nodeExternals from 'webpack-node-externals'

const server = {
  entry: ['@babel/polyfill', './server/server.js'],

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   outputPath: 'images',
            // },
          },
        ],
      },
    ],
  },
  optimization: {
    nodeEnv: false,
  },
}
export default server
