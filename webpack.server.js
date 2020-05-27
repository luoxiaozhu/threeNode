const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');

const PORT = 9001;


const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
    quiet: true
});
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));


app.listen(PORT, '0.0.0.0', () => {
    console.log(`开发服务器启动中: 0.0.0.0:${PORT}`);
});
