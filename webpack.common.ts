import * as path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import WebpackDevServer from "webpack-dev-server"
import Dotenv from 'dotenv'

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const entry: webpack.Entry = {
  main: src + '/index.tsx'
}

const output: webpack.Output = {
  path: dist,
  publicPath: '/',
  filename: 'bundle.js?[hash]'
}

const rules: webpack.Rule[] = [
  {
    test: /\.(ts|tsx)$/,
    use: [
      {loader: 'babel-loader'},
      {loader: 'ts-loader'}
    ]
  },
  {
    test: /\.styl$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-modules-typescript-loader"},
      { loader: "css-loader", options: { modules: true } },
      { loader: "stylus-loader" }
    ]
  }
]

const inject_environment = (content) => {
  Dotenv.config()
  return content.toString()
    .replace('process.env.REACT_APP_FIREBASE_SENDER_ID', JSON.stringify(process.env.REACT_APP_FIREBASE_SENDER_ID))
}

const plugins: webpack.Plugin[] = [
  new HtmlWebpackPlugin({
    template: src + '/index.html',
    filename: 'index.html'
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: src + '/firebase-messaging-sw.js',
        to: dist,
        context: src,
        transform (content) {
          return inject_environment(content)
        }
      },
      {
        from: src + '/manifest.json',
        to: dist,
        context: src
      }
    ],
  }),
  new WriteFilePlugin()
]

const proxy: WebpackDevServer.ProxyConfigMap = {
  '/firebase-api': {
    target: 'https://fcm.googleapis.com/',
    pathRewrite: { '^/firebase-api': '' },
    secure: false,
    changeOrigin: true
  },
  '/backlog-api': {
    target: 'https://creative-m.backlog.com/',
    pathRewrite: { '^/backlog-api': '' },
    secure: false,
    changeOrigin: true,
    autoRewrite: true
  },
}

const devServer: WebpackDevServer.Configuration = {
  historyApiFallback: true,
  contentBase: dist,
  host: '0.0.0.0',
  proxy: proxy,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
}

export const config: webpack.Configuration = {
  entry: entry,
  output: output,
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: plugins,
  devServer: devServer,
  performance: { hints: false }
}