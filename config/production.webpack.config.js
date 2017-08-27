var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //https://www.npmjs.com/package/html-webpack-plugin
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); https://www.npmjs.com/package/optimize-css-assets-webpack-plugin

module.exports = function(env) {
    return {
        entry: {
            main: path.resolve(__dirname, '..', 'app', 'entryPoints', 'main'),
            vendor: ['bootstrap', 'jquery'],
            keyboard: path.resolve(__dirname, '..', 'app', 'entryPoints', '00_keyboard'),
            piano: path.resolve(__dirname, '..', 'app', 'entryPoints', '01_piano'),
            clock: path.resolve(__dirname, '..', 'app', 'entryPoints', '02_clock'),
            variables: path.resolve(__dirname, '..', 'app', 'entryPoints', '03_css-variables')            
        },
        output: {
            path: path.join(__dirname, '..', 'build-production'),
            filename: 'js/[name].[chunkhash].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|bower_components)/,
                    options: {
                        presets: [['es2015', {'modules': false}]]
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /(node-modules|bower_components)/,
                    query: require(path.resolve(__dirname, 'eslint.config.js'))
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'resolve-url-loader', 'postcss-loader'],
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { 
                                loader: 'css-loader', 
                                options: { sourceMap: true } 
                            },
                            { 
                                loader: 'postcss-loader', 
                                options: { 
                                    sourceMap: true,
                                    config: {
                                        path: './config/postcss.config.js'
                                    }
                                } 
                            },
                            { 
                                loader: 'sass-loader', 
                                options: { 
                                    sourceMap: true 
                                } 
                            }
                        ]
                    }),
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test:   /\.(woff|ttf|otf|eot|woff2|svg)(\?.+)?$/,
                    loader: 'url-loader',
                    options:  {
                        limit: 10000,
                        name: "./fonts/[chunkhash].[ext]"
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|ico)$/i,
                    use: 'file-loader?name=[name].[ext]&publicPath=/&outputPath=images/'
                },
                {
                    test: /\.(mp3|wav)$/i,
                    use: 'file-loader?name=[name].[ext]&publicPath=/&outputPath=audio/'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.scss', 'jpg', 'png'],
            alias: {
                Pages: path.resolve(__dirname, '..', 'app', 'js')
            }
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'css/[name].[chunkhash].css',
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/vendor.[chunkhash].bundle.js',
                chunks: ['vendor'] 
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'app', 'entryPoints', 'main', 'index.html'),
                hash: true,
                chunks: ['main'],
                title: 'Main'
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'app', 'entryPoints', '00_keyboard', 'keyboard.html'),
                hash: true,
                chunks: ['keyboard'],
                filename: 'keyboard.html',
                title: 'Keyboard'
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'app', 'entryPoints', '01_piano', 'piano.html'),
                hash: true,
                chunks: ['piano'],
                filename: 'piano.html',
                title: 'Piano'
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'app', 'entryPoints', '02_clock', 'clock.html'),
                hash: true,
                chunks: ['clock'],
                filename: 'clock.html',
                title: 'Clock'
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'app', 'entryPoints', '03_css-variables', 'css-variables.html'),
                hash: true,
                chunks: ['variables'],
                filename: 'variables.html',
                title: 'CSS variables'
            }),
            new cleanWebpackPlugin(['build-production'], {
                root: path.resolve(__dirname, '..'),
                verbose: true
            }),
            new optimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: { 
                    discardComments: {
                        removeAll: true 
                    } 
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                },
                mangle: false,
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                'proccess.env.NODE_ENV': JSON.stringify(env),
                'env': JSON.stringify(env)
            }),
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, '..', 'app', 'images', 'icons'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, '..', 'build-development', 'images' ,'icons.png'),
                    css: path.resolve(__dirname, '..', 'build-development', 'css' ,'icons.css')
                },
                spritesmithOptions: {
                    padding: 5
                },
                apiOptions: {
                    cssImageRef: "./images/icons.png"
                }
            })
        ],
        devServer: {
            contentBase: path.resolve(__dirname, '..', 'build-production'),
            inline: true,
            port: 3333
        },
        devtool: 'source-map' //https://webpack.js.org/configuration/devtool/
    }
}