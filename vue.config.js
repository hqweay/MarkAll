const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/renderer'))
      .set('~', resolve('src'))
      .set('root', resolve('./'))
      .set('#', resolve('src/universal'))
  },
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'markall://./',
      externals: ['markall'],
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('@', resolve('src/renderer'))
          .set('~', resolve('src'))
          .set('root', resolve('./'))
          .set('#', resolve('src/universal'))
      },
      builderOptions: {
        productName: 'MarkAll',
        appId: 'net.leay.markall',
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: 'build/icons/icon.icns',
          extendInfo: {
            LSUIElement: 1
          }
        },
        win: {
          icon: 'build/icons/icon.ico',
          target: 'nsis'
        },
        nsis: {
          shortcutName: 'MarkAll',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        linux: {
          icon: 'build/icons/icon'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`
      }
    }
  },
}
