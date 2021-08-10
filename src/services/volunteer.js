import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================通知公告===========================

export async function queryProjectNotice(params = {}) {
  return request('/api/blade-volunteer/vol/insert',{
    method: 'POST',
    body: func.toFormData(params),
  });
}

// export async function list(params) {
//   return request(`/api/blade-volunteer/vol/list?${stringify(params)}`);
// }

export async function list(params) {
  return request('/api/blade-volunteer/vol/list', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
export async function remove(params) {
  return request('/api/blade-volunteer/vol/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-volunteer/vol/insert', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request('/api/blade-volunteer/vol/updata',{
    method: 'POST',
    body: params,
  });
}
