const Path = require('path');
var Webpack = require('webpack');

const crypto = require('crypto');
const crypto_org_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_org_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
  mode: "development",
  devServer: {
    contentBase: Path.join(__dirname, 'Client'),
    compress: true,
    port: 8990,
    //overlay: true

  },
  entry: {
    'polyfills': './src/polyfills.ts',
    'app': './src/main.ts'
  },
  module: {

    rules: [
      {
        test: /\.ts$/, // определяем тип файлов
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: Path.resolve(__dirname, 'tsconfig.json') },

          },
          'angular2-template-loader',
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /.*\.(png|svg|jpg)(\?|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              loader: 'image-webpack-loader',
              outputPath: './images/',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ],

  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: Path.resolve(__dirname, './public'), // путь к каталогу выходных файлов - папка public
    publicPath: '/public/',
    filename: '[name].js', // название создаваемого файла,
    sourceMapFilename: "[name].js.map",

  },
  plugins: [
    new Webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      Path.resolve(__dirname, 'src'), // каталог с исходными файлами
      {} // карта маршрутов
    ),
    new Webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.min.js',
      jQuery: 'jquery/dist/jquery.min.js',
      'window.jQuery': 'jquery/dist/jquery.min.js'
    })
  ],
  devtool: 'source-map'
};