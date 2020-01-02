
// ref: https://umijs.org/config/

let publicPath
if(process.env.UMI_ENV === 'dev') {
  publicPath = '/static/'
} else if (process.env.UMI_ENV === 'prod') {
  publicPath = '/./'
}

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const path = require('path');

export default {
  publicPath,
  treeShaking: true,
  theme: './theme-config.js',
  targets: {
    ie: 11,
  },
  copy: [
    {from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'},
    {from: path.join(cesiumSource, 'Assets'), to: 'Assets'},
    {from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'},
  ],
  define: {
    SERVICE_URL: ''
  },
  // proxy: {
  //   "/api": {
  //     // "target": "http://10.70.119.181:18081/indicator/v1/",
  //     // "target": "http://10.70.119.181:18081/indicator/v1/", //稼轩本地
  //     "target": "http://192.168.221.9:8082/indicator/v1/",
  //     "changeOrigin": true,
  //     "pathRewrite": {
  //       "^/api": ""
  //     }
  //   }
  // },
  // 自定义路由开启则默认路由不再生效
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts',
  //     routes: [
  //       {
  //         path: '/s3',
  //         component: './s3'
  //       }
  //     ]
  //   },
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: true,
      title: '资产管理系统',
      links: [{
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }],
      dll: false,
      routes: {
        exclude: [
          /components\//,
          /models\//,
          /services\//,
        ]
      },
    }],
    'umi-plugin-polyfill'
  ],
  chainWebpack(config, { webpack }) {
    config.module.rule('gltf')
      .test(/\.(gltf)$/)
      .use('gltf-webpack-loader')
      .loader('gltf-webpack-loader')
    config.module.rule('gltf')
      .test(/\.(obj)$/)
      .use('webpack-obj-loader')
      .loader('webpack-obj-loader')

  }
}
