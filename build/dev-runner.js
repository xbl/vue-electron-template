const { spawn } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const utils = require('./utils');
const config = require('../config');
const electron = require('electron');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
let electronProcess;

const devWebpackConfig = require('./webpack.electron.conf');
const devServerOptions = {
  clientLogLevel: 'warning',
  historyApiFallback: true,
  hot: true,
  compress: true,
  host: HOST || config.dev.host,
  port: PORT || config.dev.port,
  open: config.dev.autoOpenBrowser,
  overlay: config.dev.errorOverlay
    ? { warnings: false, errors: true }
    : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  quiet: true, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: config.dev.poll,
  },
  stats: {
    colors: true
  },
};

// Add FriendlyErrorsPlugin
devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: ['SUCCESS'],
  },
  onErrors: config.dev.notifyOnErrors
  ? utils.createNotifierCallback()
  : undefined
}));

WebpackDevServer.addDevServerEntrypoints(devWebpackConfig, devServerOptions);
const compiler = webpack(devWebpackConfig);

compiler.plugin('done', function(compilation) {
  if(!electronProcess)
    startElectronProcess();
});

portfinder.basePort = process.env.PORT || config.dev.port
portfinder.getPort((err, port) => {
  if (err) {
    return err;
  }
  // publish the new Port, necessary for e2e tests
  process.env.PORT = port
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(port);
});

const startElectronProcess = () => {
  electronProcess = spawn(electron, [ path.join(__dirname, '../main.js')]);
  electronProcess.stdout.on('data', data => {
    console.log(data.toString(), 'blue');
  });
  electronProcess.stderr.on('data', data => {
    console.log(data.toString(), 'red');
  });
  electronProcess.on('close', () => {
    process.exit();
  });
};
