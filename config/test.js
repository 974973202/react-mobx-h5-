var fs = require('fs')
var path = require('path')

var paths = require('../config/paths')
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// console.log(resolveApp('public/index.html'))
// console.log(process.env.PORT)

const proxtSetting = require(paths.appPackageJson).proxy
console.log(proxtSetting)
const proxyConfig = prepareProxy(proxtSetting, paths.appPublic)
console.log(proxyConfig)
