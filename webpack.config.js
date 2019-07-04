//dependencies
const path                    = require("path");
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

//folders
const src    = path.resolve(__dirname, "src");
const dist   = path.resolve(__dirname, "dist");

function buildConfig(env, args){

	console.log(env, args);

	//build any additional options...
	let additionalOptions;
	switch(args.mode){

		//...for production...
		case "production":
			additionalOptions = {
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "./"
				},
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`,
						minify: {
							removeComments: true,
							collapseWhitespace: true
						}
					}),
					new DynamicCdnWebpackPlugin()
				]
			}
			break;

		//...for development...
		case "development":
		default:
			additionalOptions = {
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "/"
				},
				mode: "development",
				devtool: 'inline-source-map',
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`
					}),
					new DynamicCdnWebpackPlugin()
				],
				devServer: {
					contentBase: "./dist",
					https: false,
					historyApiFallback: true
				}
			};
			break;
	}


	//build the composite config file
	return {

		//required config options
		//-------------------------------
		entry: [
			"@babel/polyfill", 
			`${src}/index.js`
		],
		
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react"
							]
						}
					},
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: "style-loader"
						}, 
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[folder]__[local]",
								},
								url: false
							}
						},
						{
							loader: "sass-loader"
						}
					]
				},
				{
					test: /\.(png|svg|jpg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[path][name].[ext]"
							}
						}
					]
				}
			]
		},
		resolve: {
			alias: {
				COMPONENTS: `${src}/components`,
				SHARED: `${src}/shared`
			}
		},

		//optional config options
		//-------------------------------
		...additionalOptions
	}	
}//buildConfig


//configuration
module.exports = buildConfig;