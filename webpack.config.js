var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

if(TARGET === 'build') {
  module.exports = {
    devtool: 'source-map',
    entry: {
      entry: path.resolve(ROOT_PATH, 'src/index')
    },
    output: {
      path: path.resolve(ROOT_PATH, 'dist'),
      filename: 'bundle.js',
      publicPath: '/Portal/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel?optional[]=runtime'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?minimize!postcss-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
      ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
  };
} else {
  module.exports = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    output: {
      path: path.resolve(ROOT_PATH, 'dist'),
      filename: 'bundle.js',
      publicPath: '/Portal/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
        //loader: "style-loader!css-loader?minimize!postcss-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
      ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
  };
}
