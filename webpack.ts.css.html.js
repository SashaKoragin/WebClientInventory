const Path = require('path');
var Webpack = require('webpack');
module.exports = {
    mode: "development",
    devServer: {
        contentBase: Path.join(__dirname, 'Client'),
        compress: true,
        port: 8990
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
        test: /.*\.(png|woff|woff2|eot|ttf|svg|jpg)(\?|$)/,
        use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: './images/',
                        name: '[name].[ext]'
                    }
                }
        ]
    }
    ],

  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
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
    )
],
devtool: 'source-map'
};