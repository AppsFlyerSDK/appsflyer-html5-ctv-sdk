// webpack.config.js
export default {
    entry: {
        entry: '/src/AppsFlyerSDK.js'
    },
    output: {
        filename: 'appsflyerSdk.bundle.js',
        library: {
            name: 'AppsFlyerSDK',
            type: 'umd',
          },
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        ]
    },
    target: ['web', 'es5']
}