import {
  apiIndex,
} from '../services/index';
// import {

// } from '@/utils/tool';


export default {
  namespace: 's1',
  state: {
    usersData: [],

  },
  reducers: { // 跟store相关
    saveUsers (state, {payload: {usersData}}) {
      return {...state, usersData};
    },

  },
  effects: { // 跟server相关
    *Users ({}, {call, put}) {
      const {data} = yield call(apiIndex)
        yield put({
          type: 'saveUsers',
          payload: {
            usersData: data
          }
        });
    },
  },
  subscriptions: {
    setup ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/page1') {
          // 部门列表
          dispatch({type: 'Users'});
        }
      });
    }
  }
};
