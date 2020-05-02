const webpack = require("webpack");
//comes with node lets us configure paths
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

//declares node environment
//important for babel plugin because it lets it know we are running in development mode
process.env.NODE_ENV = "production";

//declaring an object that configures webpack
module.exports = {
  mode: "production",
  //target can say node which would let node play with it instead of the browser
  target: "web",
  //below devTool is recommended for production, slower to create but higher quality
  devtool: "source-map",
  //this declared entry point is also the default of webpack
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    //specifies public url of output directory when it is referenced in the browser
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    //webpack will automatically display a report of whats in our bundle
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),
    //syntax for filename means webpack will pick name for us.  This file will only be reloaded by user when it changes
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new webpack.DefinePlugin({
      //This global makes sure React is built in prod mode
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        //see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  //what files we want it to handle with rules array
  module: {
    rules: [
      //first rule for javascript
      {
        //regex fun look for either javascript or jsx files
        test: /\.(js|jsx)$/,
        //ignor node modules
        exclude: /node_modules/,
        //what to do with js files
        use: ["babel-loader", "eslint-loader"],
      },
      //process CSS
      {
        test: /(\.css)$/,

        use: [
          //this combo allows us to import css
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
