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
        /**
         * This plugin allows webpack to create an HTML file inside our build folder
         * and adds our bundle files to this HTML document. I can use the index.html
         * form our src folder as the template for creating this HTML fle. 
         */ 
         
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',        
        }),
    ],
    module: {
        rules: [
                {
                    // We will not be having jsx in this project, but I'll keep this as references for
                    // future projects. 
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        // The order matters, loaders and plugins are read from right to left. 
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
    // Allows us to import modules without having to specify the extensions listed in the enstensions array. 
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

