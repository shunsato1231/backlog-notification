import webpack from "webpack"
import { merge } from "webpack-merge"
import { config } from "./webpack.common"
import DotenvWebpack from 'dotenv-webpack'


const plugins: webpack.Plugin[] = [
  new webpack.DefinePlugin({
    'process.env': {
      REACT_APP_API_URL_BASE: JSON.stringify('http://localhost:8080'),
    }
  }),
  new DotenvWebpack()
]

const dev: webpack.Configuration = {
  mode: "development",
  plugins: plugins
}

const mainConfig: webpack.Configuration = merge(config, dev)

export default mainConfig