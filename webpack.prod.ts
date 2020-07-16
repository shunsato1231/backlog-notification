import webpack from "webpack"
import { merge } from "webpack-merge"
import { config } from "./webpack.common"
import Dotenv from 'dotenv-webpack'

const plugins: webpack.Plugin[] = [
  new Dotenv()
]

const prod: webpack.Configuration = {
  mode: "production",
  plugins: plugins,
}

const mainConfig: webpack.Configuration = merge(config, prod)

export default mainConfig