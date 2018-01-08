const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;
let sourceMap;

if (env === 'dev') {
    sourceMap = true;
} else if (env === 'production') {
    sourceMap = false;
}





module.exports = {
    entry: {
        // 'css/style.css': './src/scss/style.scss',
        'js/index.min.js': './src/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]'
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader?url=false',
                        options: {
                            minimize: true
                            // sourceMap: sourceMap
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: sourceMap
                        }
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMap
                        }
                    }]
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    query:  {
                        limit: 1000000
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({ minimize: true, sourceMap: sourceMap }),
        new ExtractTextPlugin({
            filename:  'css/style.min.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    devtool: sourceMap ? 'source-map' : ''
};