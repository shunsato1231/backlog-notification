const path = require("path");

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
      test: /\.styl$/,
      loaders: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                  importLoaders: 1,
                  modules: {
                      mode: 'local',
                      localIdentName: '[path][name]__[local]--[hash:base64:5]',
                      context: path.resolve(__dirname, 'src'),
                      hashPrefix: 'my-custom-hash',
                  },
              },
          },
          require.resolve('stylus-loader')
      ],
  });
  return config;
}
 