const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new BaseHrefWebpackPlugin({ baseHref: 'https://ttquang1063750.github.io/mapPropToObject/' })
    ]
});
