const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// this loads all of the variables in the .env file
// they're available in your code as process.env.KEY
require('dotenv').config(); //this makes the .env stuff available, see line 101 for why you don't have to do process.env.PROPERTY_NAME

/**
 * flag Used to check if the environment is production or not
*/
const isProduction = (process.env.NODE_ENV === 'production');

/**
* Include hash to filenames for cache busting - only at production
*/
const fileNamePrefix = isProduction? '[chunkhash].' : '';

module.exports = {
    mode: !isProduction ? 'development': 'production',
    entry: {
      index: './src/js/index.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: fileNamePrefix + '[name].js',
      assetModuleFilename: "assets/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 
    /* no separate source map files in production */
    devtool: !isProduction ? 'source-map' : 'inline-source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }}
        }, 
        { 
          test: /\.css$/i, 
          /* separate js code and css in production */
          use: isProduction ?
            [ MiniCssExtractPlugin.loader, 'css-loader']	:
            [ 'style-loader', 'css-loader']		
        },
        { 
            test: /.s[ac]ss$/i, 
            use: isProduction ?
              [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']	:
              [ 'style-loader', 'css-loader' , 'sass-loader']		
        },
        {  
          test: /\.(svg|eot|ttf|woff|woff2)$/i,  
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["index"],
        inject: "body",
        filename: "index.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/job-posting.html"),
        chunks: ["index"],
        inject: "body",
        filename: "job-posting.html",
      }),
      // new copyPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, "src/assets/images"),
      //       to: path.resolve(__dirname, "dist/assets/images"),
      //     },
      //   ],
      // }),

      /* app uses global SERVER_URL rather than process.env.SERVER_URL */
      new webpack.DefinePlugin({
        ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
        INSTANCE_URL: JSON.stringify(process.env.INSTANCE_URL),
        USER_ID: JSON.stringify(process.env.USER_ID),
      }),
    ],
    /* separates js (and css) that is shared between bundles - allows browser to cache */
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
}

/**
 * Production only plugins
 */
 if(isProduction) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: fileNamePrefix + "[name].css",
    })
  );
};
  