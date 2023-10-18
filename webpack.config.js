const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
      main:'./views/index.js',
      login: './views/login.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',
            chunks: ['main']
            
        }),
        new HtmlWebpackPlugin({
            template: './views/login.html',
            filename: 'login.html',
            chunks: ['login']
        })
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

