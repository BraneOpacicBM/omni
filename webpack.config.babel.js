const isProduction = process.env.NODE_ENV === 'production';

const browsers = [
	'Chrome > 48',
	'Edge > 11',
	'Explorer > 10',
	'Firefox > 42',
	'Opera > 14',
	'Safari > 8',
];

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
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									modules: false,
									targets: {
										node: '9.5',
									},
								}],
								'@babel/preset-react',
								'@babel/preset-stage-1',
							],
						},
					},
				},
			],
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
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									targets: {
										browsers,
									},
								}],
								'@babel/preset-react',
								'@babel/preset-stage-1',
							],
						},
					},
				},
			],
		},
	},
];
