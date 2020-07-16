import webpack from "webpack"
import * as path from 'path'
import { merge } from "webpack-merge"
import { config } from "./webpack.common"
import  WebpackDevServer from "webpack-dev-server"
import DotenvWebpack from 'dotenv-webpack'

const dist = path.resolve(__dirname, 'dist')

const plugins: webpack.Plugin[] = [
  new webpack.DefinePlugin({
    'process.env': {
      REACT_APP_FIREBASE_API_URL_BASE: JSON.stringify('/api')
    }
  }),
  new DotenvWebpack()
]

const proxy: WebpackDevServer.ProxyConfigMap = {
  '/api': {
    target: 'https://fcm.googleapis.com/',
    pathRewrite: { '^/api': '' },
    secure:false,
    changeOrigin:true
  }
}

const devServer: WebpackDevServer.Configuration = {
  historyApiFallback: true,
  contentBase: dist,
  host: '0.0.0.0',
  proxy: proxy,
}

const dev: webpack.Configuration = {
  mode: "development",
  plugins: plugins,
  devServer: devServer
}

const mainConfig: webpack.Configuration = merge(config, dev)

export default mainConfig