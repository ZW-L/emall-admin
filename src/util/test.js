const modulesFiles = require.context('@/store/modules', true, /\.js$/)

console.log(modulesFiles.keys())

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  console.log(moduleName, value.default)
  modules[moduleName] = value.default
  return modules
}, {})

export default modules
