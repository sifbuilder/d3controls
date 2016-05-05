const fs 								= 	require('fs')
const path 							=		require("path");
const HtmlWebpackPlugin = 	require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
	nodemods: path.join(__dirname, 'node_modules'),
	data: path.join(__dirname, 'data'),
};

/*    yargs    */ 
const yargs =	require('yargs')
var argv = yargs.argv
console.log("yargs.argv");console.log(argv)
var entrysrc = (argv.entrysrc != null) ? argv.entrysrc + ".js" : "./d3example.js"
var datasrc = (argv.datasrc != null) ? path.join(PATHS.data, argv.datasrc) : PATHS.data

config = {
 	entry: entrysrc,
	output: {
		"path": __dirname + '/built',
		"filename": "index_bundle.js"
	},
	resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss', '.css', '.csv'],
    modulesDirectories: ['./', 'node_modules', "lib", "src/mods", datasrc],
  },
	module: {
		loaders: [
			{ test: /\.css$/, loaders: [ 'style', 'raw' ] }
		]
	},
	devtool: 'eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
				title: 'd3controls',
				template: 'index.ejs',
				inject: 'body',
				hash: true,
				filename: 'index.html'
			})
	],	
watch: false
};

module.exports = config