import { message } from 'antd';
import router from 'umi/router';
import { VIPCENTER_NAMESPACE } from '../actions/vipcenter';
import { query as queryVIPCENTERs, list, submit, update, detail, remove, grant } from '../services/vipcenter';
import { select as tenants } from '../services/tenant';
import { tree as roles } from '../services/role';
import { tree as depts } from '../services/dept';
import { select as posts } from '../services/post';
import { getCurrentVipCenter } from '../utils/authority';

export default {
  namespace: VIPCENTER_NAMESPACE,

  state: {
    list: [],
    currentVipCenter: {},
    data: {
      list: [],
      pagination: {},
    },
    init: {
      roleTree: [],
      deptTree: [],
      postList: [],
      tenantList: [],
    },
    detail: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryVipCenters);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { put }) {
      const currentVipCenter = getCurrentVipCenter();
      yield put({
        type: 'saveCurrentVipCenter',
        payload: currentVipCenter,
      });
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
          payload: {
            list: response.data.records,
            pagination: {
              total: response.data.total,
              current: response.data.current,
              pageSize: response.data.size,
            },
          },
        });
      }
    },
    *fetchInit({ payload }, { call, put }) {
      const responseRole = yield call(roles, payload);
      const responseDept = yield call(depts, payload);
      const responsePost = yield call(posts, payload);
      const responseTenant = yield call(tenants, payload);
      if (
        responseRole.success &&
        responseDept.success &&
        responsePost.success &&
        responseTenant.success
      ) {
        yield put({
          type: 'saveInit',
          payload: {
            roleTree: responseRole.data,
            deptTree: responseDept.data,
            postList: responsePost.data,
            tenantList: responseTenant.data,
          },
        });
      }
    },
    *fetchChangeInit({ payload }, { call, put }) {
      const responseRole = yield call(roles, payload);
      const responseDept = yield call(depts, payload);
      const responsePost = yield call(posts, payload);
      if (responseRole.success && responseDept.success && responsePost.success) {
        yield put({
          type: 'saveChangeInit',
          payload: {
            roleTree: responseRole.data,
            deptTree: responseDept.data,
            postList: responsePost.data,
          },
        });
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'saveDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *clearDetail({ payload }, { put }) {
      yield put({
        type: 'removeDetail',
        payload: { payload },
      });
    },
    *grant({ payload, callback }, { call }) {
      const response = yield call(grant, payload);
      if (response.success) {
        if (callback) {
          callback();
        }
      }
    },
    *submit({ payload }, { call }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/vipcenter');
      }
    },
    *update({ payload }, { call }) {
      const response = yield call(update, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/vipcenter');
      }
    },
    *remove({ payload }, { call }) {
      const {
        data: { keys },
        success,
      } = payload;
      const response = yield call(remove, { ids: keys });
      if (response.success) {
        success();
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentVipCenter(state, action) {
      return {
        ...state,
        currentVipCenter: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentVipCenter: {
          ...state.currentVipCenter,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload,
      };
    },
    saveChangeInit(state, action) {
      const newState = state;
      newState.init.roleTree = action.payload.roleTree;
      newState.init.deptTree = action.payload.deptTree;
      newState.init.postList = action.payload.postList;
      return {
        ...newState,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload.detail,
      };
    },
    removeDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
  },
};
