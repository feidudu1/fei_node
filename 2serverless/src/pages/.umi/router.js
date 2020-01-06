import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/index.js'),
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../404/index.js'),
            })
          : require('../404/index.js').default,
        _title: '资产管理系统',
        _title_default: '资产管理系统',
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../index.js'),
            })
          : require('../index.js').default,
        _title: '资产管理系统',
        _title_default: '资产管理系统',
      },
      {
        path: '/page1',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/yafei/practice/fei_node/2serverless/src/pages/page1/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () => import('../page1/index.js'),
            })
          : require('../page1/index.js').default,
        _title: '资产管理系统',
        _title_default: '资产管理系统',
      },
      {
        path: '/page2',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/yafei/practice/fei_node/2serverless/src/pages/page2/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () => import('../page2/index.js'),
            })
          : require('../page2/index.js').default,
        _title: '资产管理系统',
        _title_default: '资产管理系统',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/yafei/practice/fei_node/2serverless/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
        _title: '资产管理系统',
        _title_default: '资产管理系统',
      },
    ],
    _title: '资产管理系统',
    _title_default: '资产管理系统',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/yafei/practice/fei_node/2serverless/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
    _title: '资产管理系统',
    _title_default: '资产管理系统',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
