import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================通知公告===========================

export async function queryProjectNotice(params = {}) {
  return request(`/api/blade-museum/act/notices?${stringify(params)}`);
}

export async function list(params) {
  return request(`/api/blade-museum/act/list?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-museum/act/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-museum/act/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-museum/act/detail?${stringify(params)}`);
}
