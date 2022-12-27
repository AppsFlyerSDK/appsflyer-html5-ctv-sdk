// webpack.config.js
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
export default {
    entry: {
        entry: './main.js'
    },
    output: {
        path: __dirname + '/app/js/dist',
        filename: 'main.min.js',
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