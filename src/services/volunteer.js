import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-volunteer/volunteer/rest/list?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-volunteer/volunteer/rest/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
