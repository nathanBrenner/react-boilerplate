import { merge } from 'webpack-merge'
import commonConfig from './webpack/webpack.common'
import devConfig from './webpack/webpack.dev'
import prodConfig from './webpack/webpack.prod'
import webpack from 'webpack'

export default function WebpackConfig({ env }: { env: string }): webpack.Configuration {
  const envConfig = env === 'dev' ? devConfig : prodConfig
  return merge(commonConfig, envConfig)
}
