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

const prod: webpack.Configuration = {
  mode: "production",
  plugins: plugins,
}

const mainConfig: webpack.Configuration = merge(config, prod)

export default mainConfig