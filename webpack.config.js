const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    mode: process.env.NODE_ENV,
    entry: './views/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true, // good practice to clean the build folder before each build
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',        
        }),
    ],
    module: {
        rules: [
                {
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
                    }
                },
                {
                    test: /.(css|scss)$/,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.png|svg|jpg|gif$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'build'),
          publicPath: '/'
        },
        port: 8080,
        compress: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
		/**
		 * proxy is required in order to make api calls to
		 * express server while using hot-reload webpack server
		 * routes api fetch requests from localhost:8080/api/* (webpack dev server)
		 * to localhost:3000/api/* (where our Express server is running)
		 */
		proxy: {
			'/**': {
				target: 'http://localhost:3000/',
				secure: false,
			},
		},       
     },
};

