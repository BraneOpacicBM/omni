const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
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
};
