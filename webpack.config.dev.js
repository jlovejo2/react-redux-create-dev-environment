const webpack = require("webpack");
//comes with node lets us configure paths
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//declares node environment
//important for babel plugin because it lets it know we are running in development mode
process.env.NODE_ENV = "development";

//declaring an object that configures webpack
module.exports = {
  mode: "development",
  //target can say node which would let node play with it instead of the browser
  target: "web",
  //below devTool is recommended for development because it lets us see our source map in the browser
  devtool: "cheap-module-source-map",
  //this declared entry point is also the default of webpack
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    //specifies public url of output directory when it is referenced in the browser
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    //reduces info written to command line
    stats: "minimal",
    //tells it to overlay any error that occur in browser
    overlay: true,
    //all requests will be sent to index.html
    historyApiFallback: true,
    //last 3 lines are necessary to resolve open issue in chrome
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      //where to find html template
      template: "src/index.html",
      //where to find favicon
      favicon: "src/favicon.ico",
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
        //this combo allows us to import css
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
