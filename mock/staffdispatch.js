import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      staffdispatchId: 'sword',
      staffdispatchSecret: 'sword_secret',
      scope: 'all',
      authorizedGrantTypes: 'refresh_token,password,authorization_code',
      webServerRedirectUri: 'https://sword.bladex.vip',
      accessTokenValidity: '3600',
      refreshTokenValidity: '36000',
    },
    {
      id: '2',
      staffdispatchId: 'saber',
      staffdispatchSecret: 'saber_secret',
      scope: 'all',
      authorizedGrantTypes: 'refresh_token,password,authorization_code',
      webServerRedirectUri: 'https://saber.bladex.vip',
      accessTokenValidity: '3600',
      refreshTokenValidity: '36000',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 2,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = {
    id: '1',
    staffdispatchId: 'sword',
    staffdispatchSecret: 'sword_secret',
    scope: 'all',
    authorizedGrantTypes: 'refresh_token,password,authorization_code',
    webServerRedirectUri: 'https://sword.bladex.vip',
    accessTokenValidity: '3600',
    refreshTokenValidity: '36000',
  };
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/staffdispatch/list': getFakeList,
  'GET /api/blade-system/staffdispatch/detail': getFakeDetail,
  'POST /api/blade-system/staffdispatch/submit': fakeSuccess,
  'POST /api/blade-system/staffdispatch/remove': fakeSuccess,
};
export default delay(proxy, 500);
