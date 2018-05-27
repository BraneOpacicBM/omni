import CSSPlugin from 'modular-css-webpack/plugin';
import postcssColorFunction from 'postcss-color-function';
import postcssImport from 'postcss-import';
import postcssInlineSVG from 'postcss-inline-svg';
import postcssNested from 'postcss-nested';

const isProduction = process.env.NODE_ENV === 'production';

const browsers = [
	'Chrome > 48',
	'Edge > 11',
	'Explorer > 10',
	'Firefox > 42',
	'Opera > 14',
	'Safari > 8',
];

const plugins = [
	new CSSPlugin({
		css: 'public/assets/omni.css',
		map: { inline: false },
		after: [
			postcssImport(),
			postcssNested,
			postcssColorFunction,
			postcssInlineSVG(),
		],
	}),
];

function createRules(presets) {
	return [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets,
				},
			},
		},
		{
			test: /\.css$/,
			use: 'modular-css-webpack/loader',
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'public/img',
				publicPath: '/img',
			},
		},
	];
}

module.exports = [
	{
		mode: isProduction ? 'production' : 'development',
		target: 'node',
		entry: './pkg/testbed/src/index.js',
		output: {
			filename: 'index.js',
		},
		node: {
			__dirname: false,
			__filename: false,
		},
		plugins,
		module: {
			rules: createRules([
				['@babel/preset-env', {
					modules: false,
					targets: {
						node: '9.5',
					},
				}],
				'@babel/preset-react',
				'@babel/preset-stage-1',
			]),
		},
	},
	{
		mode: isProduction ? 'production' : 'development',
		target: 'web',
		entry: './pkg/testbed/src/index.js',
		output: {
			filename: 'public/assets/omni.js',
		},
		devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
		plugins,
		module: {
			rules: createRules([
				['@babel/preset-env', {
					targets: {
						browsers,
					},
				}],
				'@babel/preset-react',
				'@babel/preset-stage-1',
			]),
		},
	},
];
