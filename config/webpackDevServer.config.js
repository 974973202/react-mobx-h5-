'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
/**
 * noopServiceWorkerMiddleware
 * 返回用于/service-worker.js重置任何先前设置的服务工作者配置的Express中间件。对开发很有用。
 */
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');
const fs = require('fs');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
  return {
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // 对生成的文件启用gzip压缩。
    compress: true,
    // 由于WebPackDevServer自己的日志通常不起作用，因此请保持沉默。
    // 它仍然会显示此设置的编译警告和错误。
    clientLogLevel: 'none',
    // ...将public的文件复制到build
    contentBase: paths.appPublic,
    // 默认情况下，“contentBase”中的文件不会触发页面重新加载。
    watchContentBase: true,
    // 请注意，当前仅热重新加载对CSS的更改。JS更改将刷新浏览器。
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    // 如果https环境变量设置为“true”，则启用https
    https: protocol === 'https',
    host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    before(app, server) {
      if (fs.existsSync(paths.proxySetup)) {
        // 由于代理的原因，这注册了用户提供的中间件
        require(paths.proxySetup)(app);
      }
      // 这使我们可以从Webpack中获取错误覆盖的源内容。
      app.use(evalSourceMapMiddleware(server));
      // 这允许我们从运行时错误覆盖打开文件。
      app.use(errorOverlayMiddleware());
      /**
       * 此服务工作程序文件实际上是一个“no op”，它将重置为同一主机：
       * 端口组合注册的任何以前的服务工作程序。
       * 我们在开发中这样做是为了避免在使用相同主机和端口时碰到生产缓存。
       */
      app.use(noopServiceWorkerMiddleware());
    },
  };
};
