const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  //或者在 package.json 的 scripts 中配置 webpack --mode=development
  //mode: 'development',
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.module.rules.push({
    test: /\.css$/i, //i表示大小写不敏感
    use: [
      'style-loader',
      'css-loader'
    ]
  })
  config.output.filename = 'name.[hash:8].js'
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true
    //open: true,
  }
  //config.optimization.noEmitOnErrors = true  // 默认 true
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
} else {
  // 将不变的js单独打包
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.optimization = {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			},
    }
  }
  config.module.rules.push({
    test: /\.styl/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { sourceMap: true }
      },
      'stylus-loader'
    ]
  })
  config.module.rules.push({
    test: /\.css$/i, //i表示大小写不敏感
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
    ],
  })

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash:8].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  );

}

module.exports = config