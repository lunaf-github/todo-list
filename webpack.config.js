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
     },
};

